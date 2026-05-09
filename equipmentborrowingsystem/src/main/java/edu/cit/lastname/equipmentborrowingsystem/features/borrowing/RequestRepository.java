package edu.cit.lastname.equipmentborrowingsystem.features.borrowing;
import edu.cit.lastname.equipmentborrowingsystem.features.user.User;

import edu.cit.lastname.equipmentborrowingsystem.features.borrowing.BorrowingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<BorrowingRequest, Long> {
    List<BorrowingRequest> findByUserId(Long userId);
    List<BorrowingRequest> findByStatus(String status);
}
