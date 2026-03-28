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
@CrossOrigin(origins = "http://localhost:5173")
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
}
