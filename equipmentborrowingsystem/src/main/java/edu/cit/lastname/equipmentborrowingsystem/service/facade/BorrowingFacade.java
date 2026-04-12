package edu.cit.lastname.equipmentborrowingsystem.service.facade;

import edu.cit.lastname.equipmentborrowingsystem.dto.CreateRequestDTO;
import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import edu.cit.lastname.equipmentborrowingsystem.entity.Equipment;
import edu.cit.lastname.equipmentborrowingsystem.entity.User;
import edu.cit.lastname.equipmentborrowingsystem.repository.EquipmentRepository;
import edu.cit.lastname.equipmentborrowingsystem.repository.RequestRepository;
import edu.cit.lastname.equipmentborrowingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * BorrowingFacade provides a simplified interface to complex subsystem components
 * such as various repositories and business rules.
 * Implements the Structural Facade Design Pattern.
 */
@Service
public class BorrowingFacade {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public BorrowingRequest processBorrowingRequest(CreateRequestDTO requestDto) throws Exception {
        // 1. Validate User
        User user = userRepository.findById(requestDto.getUserId())
            .orElseThrow(() -> new Exception("User not found"));

        // 2. Validate Equipment using Builder pattern internally if needed
        Equipment equip = equipmentRepository.findById(requestDto.getEquipmentId())
            .orElseThrow(() -> new Exception("Equipment not found"));

        // 3. Business logic: Availability check
        if (!"AVAILABLE".equals(equip.getStatus())) {
            throw new Exception("Equipment is not available");
        }

        // 4. Update the subsystem: Equipment status (REMOVED - Should happen in Approve)
        // Previous logic was pre-emptively marking as loan.

        // 5. Create Request using the Builder Pattern (demonstrating pattern combination)
        BorrowingRequest newRequest = new BorrowingRequest(
            user,
            equip,
            requestDto.getBorrowDate(),
            requestDto.getReturnDate(),
            "PENDING"
        );

        return requestRepository.save(newRequest);
    }
}
