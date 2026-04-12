package edu.cit.lastname.equipmentborrowingsystem.service.penalty;

import edu.cit.lastname.equipmentborrowingsystem.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Acts as the context for the Strategy Design Pattern.
 * It selects and delegates the calculation to the specific penalty strategy
 * based on user role.
 */
@Service
public class PenaltyContext {

    private final List<PenaltyStrategy> strategies;

    @Autowired
    public PenaltyContext(List<PenaltyStrategy> strategies) {
        this.strategies = strategies;
    }

    public double calculate(User user, long daysOverdue) {
        PenaltyStrategy strategy = selectStrategy(user.getRole());
        return strategy.calculatePenalty(daysOverdue);
    }

    private PenaltyStrategy selectStrategy(String role) {
        if ("faculty".equalsIgnoreCase(role)) {
            return strategies.stream()
                .filter(s -> s instanceof FacultyPenaltyStrategy)
                .findFirst()
                .orElse(strategies.get(0));
        }
        // Default to student/standard
        return strategies.stream()
            .filter(s -> s instanceof StandardPenaltyStrategy)
            .findFirst()
            .orElse(strategies.get(0));
    }
}
