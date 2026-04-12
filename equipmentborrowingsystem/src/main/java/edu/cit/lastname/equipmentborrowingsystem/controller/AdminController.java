package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import edu.cit.lastname.equipmentborrowingsystem.entity.MaintenanceTicket;
import edu.cit.lastname.equipmentborrowingsystem.repository.RequestRepository;
import edu.cit.lastname.equipmentborrowingsystem.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllRequests() {
        System.out.println("TRACE: AdminController - getAllRequests hit");
        List<BorrowingRequest> requests = requestRepository.findAll();
        // Return all requests for admin dashboard statistics and history
        
        Map<String, Object> data = new HashMap<>();
        data.put("requests", requests);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/tickets")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminTickets() {
        System.out.println("TRACE: AdminController - getAdminTickets hit");
        List<MaintenanceTicket> tickets = ticketRepository.findAll();
        Map<String, Object> data = new HashMap<>();
        data.put("tickets", tickets);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
