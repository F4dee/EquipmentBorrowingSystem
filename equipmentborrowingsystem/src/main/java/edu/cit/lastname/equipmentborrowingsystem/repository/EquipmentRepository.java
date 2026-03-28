package edu.cit.lastname.equipmentborrowingsystem.repository;

import edu.cit.lastname.equipmentborrowingsystem.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByStatus(String status);
    List<Equipment> findByTag(String tag);
}
