package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiError;
import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import edu.cit.lastname.equipmentborrowingsystem.dto.CreateRequestDTO;
import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import edu.cit.lastname.equipmentborrowingsystem.entity.Equipment;
import edu.cit.lastname.equipmentborrowingsystem.entity.User;
import edu.cit.lastname.equipmentborrowingsystem.repository.EquipmentRepository;
import edu.cit.lastname.equipmentborrowingsystem.repository.RequestRepository;
import edu.cit.lastname.equipmentborrowingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    // Fetch all requests (for Admin)
    // Fetch all requests (for Admin)
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllRequests() {
        List<BorrowingRequest> requests = requestRepository.findAll();
        Map<String, Object> data = new HashMap<>();
        data.put("requests", requests);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    // Fetch requests for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserRequests(@PathVariable Long userId) {
        List<BorrowingRequest> requests = requestRepository.findByUserId(userId);
        Map<String, Object> data = new HashMap<>();
        data.put("requests", requests);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    // Submit a new request
    // Submit a new request
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitRequest(@RequestBody CreateRequestDTO requestDto) {
        Optional<User> userOpt = userRepository.findById(requestDto.getUserId());
        Optional<Equipment> equipOpt = equipmentRepository.findById(requestDto.getEquipmentId());

        if (userOpt.isEmpty() || equipOpt.isEmpty()) {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "User or Equipment not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(apiError));
        }

        Equipment equip = equipOpt.get();
        if (!"AVAILABLE".equals(equip.getStatus())) {
            ApiError apiError = new ApiError("BUSINESS-001", "Insufficient stock", "Equipment is currently not available");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(apiError));
        }

        BorrowingRequest newRequest = new BorrowingRequest(
                userOpt.get(),
                equip,
                requestDto.getBorrowDate(),
                requestDto.getReturnDate(),
                "PENDING"
        );

        requestRepository.save(newRequest);

        Map<String, Object> data = new HashMap<>();
        data.put("request", newRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(data));
    }

    // Update request status (Admin action)
    // Update request status (Admin action - technically belongs in AdminController per SDD
    // but placed here temporarily to avoid breaking existing flows)
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> updateData) {
        Optional<BorrowingRequest> reqOpt = requestRepository.findById(id);
        if (reqOpt.isEmpty()) {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "Request not found with ID " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(apiError));
        }

        String newStatus = updateData.get("status");
        if (newStatus == null || newStatus.isEmpty()) {
            ApiError apiError = new ApiError("VALID-001", "Validation failed", "Status cannot be empty");
            return ResponseEntity.badRequest().body(ApiResponse.error(apiError));
        }

        BorrowingRequest request = reqOpt.get();
        request.setStatus(newStatus);

        // Auto-update associated equipment status
        Equipment equip = request.getEquipment();
        if ("APPROVED".equals(newStatus) || "BORROWED".equals(newStatus)) {
            equip.setStatus("ON LOAN");
        } else if ("RETURNED".equals(newStatus) || "DENIED".equals(newStatus)) {
            equip.setStatus("AVAILABLE"); 
        }
        equipmentRepository.save(equip);

        requestRepository.save(request);

        Map<String, Object> data = new HashMap<>();
        data.put("message", "Status updated successfully");
        data.put("request", request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
