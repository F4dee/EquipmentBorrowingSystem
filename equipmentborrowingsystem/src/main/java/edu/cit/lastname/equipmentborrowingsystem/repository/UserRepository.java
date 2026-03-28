package edu.cit.lastname.equipmentborrowingsystem.repository;

import edu.cit.lastname.equipmentborrowingsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
