package edu.cit.lastname.equipmentborrowingsystem.service.penalty;

import org.springframework.stereotype.Component;

/**
 * Standard penalty calculation strategy for normal users/students.
 * Implements the Strategy Behavioral Design Pattern.
 */
@Component
public class StandardPenaltyStrategy implements PenaltyStrategy {
    private static final double RATE_PER_DAY = 50.0; // 50 pesos per day

    @Override
    public double calculatePenalty(long daysOverdue) {
        return Math.max(0, daysOverdue * RATE_PER_DAY);
    }

    @Override
    public String getStrategyName() {
        return "Standard Student Penalty (50/day)";
    }
}
