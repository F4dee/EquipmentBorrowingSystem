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
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/requests/pending")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPendingRequests() {
        List<BorrowingRequest> requests = requestRepository.findAll();
        // Since no custom method yet, simple in-memory filter or just return all to front-end for now
        // SDD specified /admin/requests/pending so ideally it's only pending.
        requests.removeIf(req -> !"PENDING".equals(req.getStatus()));
        
        Map<String, Object> data = new HashMap<>();
        data.put("requests", requests);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/tickets")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminTickets() {
        List<MaintenanceTicket> tickets = ticketRepository.findAll();
        Map<String, Object> data = new HashMap<>();
        data.put("tickets", tickets);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
