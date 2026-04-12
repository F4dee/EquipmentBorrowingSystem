package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiError;
import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import edu.cit.lastname.equipmentborrowingsystem.dto.CreateRequestDTO;
import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import edu.cit.lastname.equipmentborrowingsystem.entity.Equipment;
import edu.cit.lastname.equipmentborrowingsystem.repository.EquipmentRepository;
import edu.cit.lastname.equipmentborrowingsystem.repository.RequestRepository;
import edu.cit.lastname.equipmentborrowingsystem.service.facade.BorrowingFacade;
import edu.cit.lastname.equipmentborrowingsystem.service.notification.BorrowingEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Refactored controller using Software Design Patterns.
 * Demonstrated Patterns:
 * - Structural: FACADE (Coordinates multiple repositories/logic)
 * - Behavioral: OBSERVER (Notifies listeners of state changes)
 * - Creational: SINGLETON (Spring-managed Bean)
 */
@RestController
@RequestMapping("/api/v1/requests")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    // Structural Pattern: FACADE
    @Autowired
    private BorrowingFacade borrowingFacade;

    // Behavioral Pattern: OBSERVER
    @Autowired
    private BorrowingEventPublisher eventPublisher;

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

    // Submit a new request - NOW USING FACADE (Refactored)
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitRequest(@RequestBody CreateRequestDTO requestDto) {
        try {
            // Logic moved to Facade to reduce controller bloat
            BorrowingRequest newRequest = borrowingFacade.processBorrowingRequest(requestDto);
            
            // Behavioral Pattern: Observer - Notify about the new pending request
            eventPublisher.notifyObservers(newRequest, "PENDING");

            Map<String, Object> data = new HashMap<>();
            data.put("request", newRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(data));
        } catch (Exception e) {
            ApiError apiError = new ApiError("REQ-ERR", "Request processing failed", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(apiError));
        }
    }

    // Update request status (Admin action) - NOW USING OBSERVER (Refactored)
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

        request.setUpdatedAt(java.time.LocalDateTime.now());
        requestRepository.save(request);

        // Behavioral Pattern: Observer
        eventPublisher.notifyObservers(request, newStatus);

        Map<String, Object> data = new HashMap<>();
        data.put("message", "Status updated successfully");
        data.put("request", request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
