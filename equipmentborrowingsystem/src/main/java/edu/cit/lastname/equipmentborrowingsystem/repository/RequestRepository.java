package edu.cit.lastname.equipmentborrowingsystem.repository;

import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<BorrowingRequest, Long> {
    List<BorrowingRequest> findByUserId(Long userId);
    List<BorrowingRequest> findByStatus(String status);
}
