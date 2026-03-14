package edu.cit.lastname.equipmentborrowingsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance_tickets")
public class MaintenanceTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String labLocation;

    @Column(nullable = false)
    private String pcNumber;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private String status; // OPEN, RESOLVED

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public MaintenanceTicket() {}

    public MaintenanceTicket(User user, String labLocation, String pcNumber, String description, String status) {
        this.user = user;
        this.labLocation = labLocation;
        this.pcNumber = pcNumber;
        this.description = description;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getLabLocation() { return labLocation; }
    public void setLabLocation(String labLocation) { this.labLocation = labLocation; }
    public String getPcNumber() { return pcNumber; }
    public void setPcNumber(String pcNumber) { this.pcNumber = pcNumber; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
