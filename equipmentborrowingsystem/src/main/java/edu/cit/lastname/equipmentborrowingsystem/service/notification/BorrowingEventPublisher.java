package edu.cit.lastname.equipmentborrowingsystem.service.notification;

import edu.cit.lastname.equipmentborrowingsystem.entity.BorrowingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Subject (Publisher) for the Observer Behavioral pattern.
 * Managers the registration and notification of observers when 
 * borrowing events occur.
 */
@Service
public class BorrowingEventPublisher {

    private final List<BorrowingObserver> observers = new ArrayList<>();

    @Autowired
    public BorrowingEventPublisher(List<BorrowingObserver> observers) {
        this.observers.addAll(observers);
    }

    public void notifyObservers(BorrowingRequest request, String status) {
        for (BorrowingObserver observer : observers) {
            observer.onStatusChange(request, status);
        }
    }
}
