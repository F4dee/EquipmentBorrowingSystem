package edu.cit.lastname.equipmentborrowingsystem.service.notification;

import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import org.springframework.stereotype.Component;

/**
 * Concrete implementation of the Observer Behavioral Pattern.
 * Simulates sending an email notification when a BorrowingRequest
 * status changes.
 */
@Component
public class EmailNotificationObserver implements BorrowingObserver {

    @Override
    public void onStatusChange(BorrowingRequest request, String newStatus) {
        System.out.println("DEBUG (Observer Pattern): Sending Email to " + 
            request.getUser().getEmail() + 
            " - Subject: Equipment Request Update - " + 
            "Your request for " + request.getEquipment().getName() + 
            " is now " + newStatus);
    }
}
