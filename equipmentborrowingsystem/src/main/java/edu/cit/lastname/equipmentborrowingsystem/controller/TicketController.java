package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiError;
import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import edu.cit.lastname.equipmentborrowingsystem.dto.CreateTicketDTO;
import edu.cit.lastname.equipmentborrowingsystem.entity.MaintenanceTicket;
import edu.cit.lastname.equipmentborrowingsystem.entity.User;
import edu.cit.lastname.equipmentborrowingsystem.repository.TicketRepository;
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
@RequestMapping("/api/v1/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    // Fetch all tickets (for Admin Dashboard)
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllTickets() {
        List<MaintenanceTicket> tickets = ticketRepository.findAll();
        Map<String, Object> data = new HashMap<>();
        data.put("tickets", tickets);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    // Fetch user tickets
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserTickets(@PathVariable Long userId) {
        List<MaintenanceTicket> tickets = ticketRepository.findByUserId(userId);
        Map<String, Object> data = new HashMap<>();
        data.put("tickets", tickets);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    // Submit a new maintenance ticket
    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitTicket(@RequestBody CreateTicketDTO ticketDto) {
        Optional<User> userOpt = userRepository.findById(ticketDto.getUserId());
        
        if (userOpt.isEmpty()) {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(apiError));
        }

        MaintenanceTicket newTicket = new MaintenanceTicket(
                userOpt.get(),
                ticketDto.getLabLocation(),
                ticketDto.getPcNumber(),
                ticketDto.getDescription(),
                "OPEN"
        );

        ticketRepository.save(newTicket);

        Map<String, Object> data = new HashMap<>();
        data.put("ticket", newTicket);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(data));
    }
    
    // Update ticket status (Admin action)
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> updateData) {
        Optional<MaintenanceTicket> ticketOpt = ticketRepository.findById(id);
        if (ticketOpt.isEmpty()) {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "Ticket not found with ID " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(apiError));
        }

        String newStatus = updateData.get("status");
        if (newStatus == null || newStatus.isEmpty()) {
            ApiError apiError = new ApiError("VALID-001", "Validation failed", "Status cannot be empty");
            return ResponseEntity.badRequest().body(ApiResponse.error(apiError));
        }

        MaintenanceTicket ticket = ticketOpt.get();
        ticket.setStatus(newStatus.toUpperCase());
        ticketRepository.save(ticket);

        Map<String, Object> data = new HashMap<>();
        data.put("message", "Ticket status updated to " + newStatus);
        data.put("ticket", ticket);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    // Delete a ticket permanent (Admin action)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> deleteTicket(@PathVariable Long id) {
        if (!ticketRepository.existsById(id)) {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "Ticket not found with ID " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(apiError));
        }

        ticketRepository.deleteById(id);
        
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Ticket deleted successfully");
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
