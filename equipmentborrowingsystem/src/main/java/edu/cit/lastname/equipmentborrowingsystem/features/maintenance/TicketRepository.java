package edu.cit.lastname.equipmentborrowingsystem.features.maintenance;
import edu.cit.lastname.equipmentborrowingsystem.features.user.User;

import edu.cit.lastname.equipmentborrowingsystem.features.maintenance.MaintenanceTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<MaintenanceTicket, Long> {
    List<MaintenanceTicket> findByStatus(String status);
    List<MaintenanceTicket> findByUserId(Long userId);
}
