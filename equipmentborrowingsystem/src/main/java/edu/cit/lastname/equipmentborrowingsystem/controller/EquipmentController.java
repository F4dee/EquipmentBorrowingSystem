package edu.cit.lastname.equipmentborrowingsystem.controller;

import edu.cit.lastname.equipmentborrowingsystem.dto.ApiError;
import edu.cit.lastname.equipmentborrowingsystem.dto.ApiResponse;
import edu.cit.lastname.equipmentborrowingsystem.entity.Equipment;
import edu.cit.lastname.equipmentborrowingsystem.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/items")
public class EquipmentController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllEquipment() {
        List<Equipment> items = equipmentRepository.findAll();
        Map<String, Object> data = new HashMap<>();
        data.put("items", items);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getEquipmentById(@PathVariable Long id) {
        Optional<Equipment> equipment = equipmentRepository.findById(id);
        if (equipment.isPresent()) {
            Map<String, Object> data = new HashMap<>();
            data.put("item", equipment.get());
            return ResponseEntity.ok(ApiResponse.success(data));
        } else {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "Equipment not found with ID " + id);
            return ResponseEntity.status(404).body(ApiResponse.error(apiError));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> createEquipment(@RequestBody Equipment newEquipment) {
        newEquipment.setStatus("AVAILABLE"); // default status
        Equipment saved = equipmentRepository.save(newEquipment);
        Map<String, Object> data = new HashMap<>();
        data.put("item", saved);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
        return equipmentRepository.findById(id).map(existing -> {
            if (updatedEquipment.getName() != null) existing.setName(updatedEquipment.getName());
            if (updatedEquipment.getTag() != null) existing.setTag(updatedEquipment.getTag());
            if (updatedEquipment.getEquipId() != null) existing.setEquipId(updatedEquipment.getEquipId());
            if (updatedEquipment.getStatus() != null) existing.setStatus(updatedEquipment.getStatus());
            
            Equipment saved = equipmentRepository.save(existing);
            Map<String, Object> data = new HashMap<>();
            data.put("item", saved);
            return ResponseEntity.ok(ApiResponse.success(data));
        }).orElseGet(() -> {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "Equipment not found with ID " + id);
            return ResponseEntity.status(404).body(ApiResponse.error(apiError));
        });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> deleteEquipment(@PathVariable Long id) {
        return equipmentRepository.findById(id).map(existing -> {
            equipmentRepository.delete(existing);
            Map<String, Object> data = new HashMap<>();
            data.put("deletedId", id);
            return ResponseEntity.ok(ApiResponse.success(data));
        }).orElseGet(() -> {
            ApiError apiError = new ApiError("DB-001", "Resource not found", "Equipment not found with ID " + id);
            return ResponseEntity.status(404).body(ApiResponse.error(apiError));
        });
    }
}
