package edu.cit.lastname.equipmentborrowingsystem.config;

import edu.cit.lastname.equipmentborrowingsystem.entity.Equipment;
import edu.cit.lastname.equipmentborrowingsystem.repository.EquipmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(EquipmentRepository equipmentRepository) {
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
        };
    }
}
