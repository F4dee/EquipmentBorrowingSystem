package edu.cit.lastname.equipmentborrowingsystem.core.shared;

import edu.cit.lastname.equipmentborrowingsystem.features.user.User;
import edu.cit.lastname.equipmentborrowingsystem.features.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return new CustomUserDetails(userOptional.get());
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }
}
