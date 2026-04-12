package edu.cit.lastname.equipmentborrowingsystem.service.notification;

import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;

/**
 * Observer interface for the Behavioral Design Pattern.
 * Defines the contract for objects that should be notified about 
 * BorrowingRequest status changes (Events).
 */
public interface BorrowingObserver {
    void onStatusChange(BorrowingRequest request, String newStatus);
}
