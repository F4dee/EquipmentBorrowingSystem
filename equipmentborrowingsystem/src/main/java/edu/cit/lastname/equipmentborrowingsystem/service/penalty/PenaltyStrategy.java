package edu.cit.lastname.equipmentborrowingsystem.service.penalty;

public interface PenaltyStrategy {
    double calculatePenalty(long daysOverdue);
    String getStrategyName();
}
