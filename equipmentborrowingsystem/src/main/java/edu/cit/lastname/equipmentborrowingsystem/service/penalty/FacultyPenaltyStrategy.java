package edu.cit.lastname.equipmentborrowingsystem.service.penalty;

import org.springframework.stereotype.Component;

/**
 * Penalty calculation strategy specifically for faculty members.
 * Offers a discounted rate as per institutional policy.
 * Implements the Strategy Behavioral Design Pattern.
 */
@Component
public class FacultyPenaltyStrategy implements PenaltyStrategy {
    private static final double RATE_PER_DAY = 20.0; // Reduced rate for faculty

    @Override
    public double calculatePenalty(long daysOverdue) {
        return Math.max(0, daysOverdue * RATE_PER_DAY);
    }

    @Override
    public String getStrategyName() {
        return "Faculty Discounted Penalty (20/day)";
    }
}
