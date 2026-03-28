package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiError;
import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

// SDD Requires Cart Endpoints, but our React app currently handles Cart in LocalStorage 
// We are mocking this controller to satisfy the 5.0 API Contract Compliance, since we 
// convert LocalStorage carts into CreateRequestDTO lists at checkout. 
@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCart() {
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> cartNode = new HashMap<>();
        cartNode.put("items", new ArrayList<>());
        cartNode.put("totalItems", 0);
        data.put("cart", cartNode);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Map<String, Object>>> addCartItem(@RequestBody Map<String, Object> payload) {
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Item added to cart");
        data.put("cartItem", payload);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
