package edu.cit.lastname.equipmentborrowingsystem.dto;

public class CreateTicketDTO {
    private Long userId;
    private String labLocation;
    private String pcNumber;
    private String description;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getLabLocation() { return labLocation; }
    public void setLabLocation(String labLocation) { this.labLocation = labLocation; }
    public String getPcNumber() { return pcNumber; }
    public void setPcNumber(String pcNumber) { this.pcNumber = pcNumber; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
