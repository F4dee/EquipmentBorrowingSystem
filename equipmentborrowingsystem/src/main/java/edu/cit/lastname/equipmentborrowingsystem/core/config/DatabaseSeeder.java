package edu.cit.lastname.equipmentborrowingsystem.core.config;

import edu.cit.lastname.equipmentborrowingsystem.features.equipment.Equipment;
import edu.cit.lastname.equipmentborrowingsystem.features.equipment.EquipmentRepository;
import edu.cit.lastname.equipmentborrowingsystem.features.user.User;
import edu.cit.lastname.equipmentborrowingsystem.features.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(
            EquipmentRepository equipmentRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed equipment only if empty
            if (equipmentRepository.count() == 0) {
                equipmentRepository.saveAll(Arrays.asList(
                    new Equipment("EQ-001", "MacBook Pro 16\"", "LAPTOP", "AVAILABLE"),
                    new Equipment("EQ-002", "Dell XPS 15", "LAPTOP", "ON LOAN"),
                    new Equipment("EQ-003", "Canon EOS R5", "CAMERAS", "AVAILABLE"),
                    new Equipment("EQ-004", "Sony A7 IV", "CAMERAS", "MAINTENANCE"),
                    new Equipment("EQ-005", "Epson Pro EX9220", "PROJECTORS", "AVAILABLE"),
                    new Equipment("EQ-006", "Bose S1 Pro", "AUDIO", "AVAILABLE"),
                    new Equipment("EQ-007", "HDMI Cable 10ft", "CABLES", "AVAILABLE"),
                    new Equipment("EQ-008", "USB-C Hub", "OTHER", "ON LOAN")
                ));
                System.out.println("Initialized Equipment Database with Mock Data.");
            }

            // Ensure admin@citu.edu exists
            if (!userRepository.existsByEmail("admin@citu.edu")) {
                userRepository.save(new User("Admin", "admin@citu.edu", passwordEncoder.encode("password123"), "admin"));
                System.out.println("Seeded admin@citu.edu admin user.");
            }

            // Ensure jonas@citu.edu exists
            if (!userRepository.existsByEmail("jonas@citu.edu")) {
                userRepository.save(new User("Jonas", "jonas@citu.edu", passwordEncoder.encode("password123"), "user"));
                System.out.println("Seeded jonas@citu.edu user.");
            }
        };
    }
}
