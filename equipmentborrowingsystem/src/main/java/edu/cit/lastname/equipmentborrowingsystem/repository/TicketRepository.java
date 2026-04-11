package edu.cit.lastname.equipmentborrowingsystem.repository;

import edu.cit.lastname.equipmentborrowingsystem.entity.MaintenanceTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<MaintenanceTicket, Long> {
    List<MaintenanceTicket> findByStatus(String status);
    List<MaintenanceTicket> findByUserId(Long userId);
}
