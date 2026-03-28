package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiError;
import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import edu.cit.lastname.equipmentborrowingsystem.dto.LoginRequest;
import edu.cit.lastname.equipmentborrowingsystem.dto.RegisterRequest;
import edu.cit.lastname.equipmentborrowingsystem.entity.User;
import edu.cit.lastname.equipmentborrowingsystem.repository.UserRepository;
import edu.cit.lastname.equipmentborrowingsystem.security.JwtUtil;
import edu.cit.lastname.equipmentborrowingsystem.security.RateLimitingService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow React Frontend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private RateLimitingService rateLimitingService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, Object>>> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            ApiError apiError = new ApiError("AUTH-004", "Registration failed", "Email is already taken");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(apiError));
        }

        // Phase 5 Password Requirement Check
        if (request.getPassword().length() < 8 || !request.getPassword().matches(".*[a-zA-Z]+.*") || !request.getPassword().matches(".*[0-9]+.*")) {
            ApiError apiError = new ApiError("VALID-002", "Validation failed", "Password must be at least 8 characters and contain both letters and numbers.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(apiError));
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole()
        );

        userRepository.save(user);

        // SDD Requires sending down { user: {..}, accessToken: ... } - we'll skip tokens on Reg for now
        // since we force login right after, or you can generate one.
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> userDetailsMap = new HashMap<>();
        userDetailsMap.put("id", user.getId());
        userDetailsMap.put("name", user.getName());
        userDetailsMap.put("email", user.getEmail());
        userDetailsMap.put("role", user.getRole());
        data.put("user", userDetailsMap);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(data));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {

        // IP Based Rate Limiting Interceptor
        String clientIp = httpRequest.getRemoteAddr();
        Bucket bucket = rateLimitingService.resolveBucket(clientIp);

        if (!bucket.tryConsume(1)) {
            ApiError apiError = new ApiError("AUTH-005", "Rate Limit Exceeded", "Too many login attempts. Please try again later.");
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(ApiResponse.error(apiError));
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            ApiError apiError = new ApiError("AUTH-001", "Invalid credentials", "Email or password is incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(apiError));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        User user = optionalUser.get();

        Map<String, Object> data = new HashMap<>();
        data.put("accessToken", jwt);

        Map<String, Object> userDetailsMap = new HashMap<>();
        userDetailsMap.put("id", user.getId());
        userDetailsMap.put("fullName", user.getName());
        userDetailsMap.put("email", user.getEmail());
        userDetailsMap.put("role", user.getRole());

        data.put("user", userDetailsMap);

        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
