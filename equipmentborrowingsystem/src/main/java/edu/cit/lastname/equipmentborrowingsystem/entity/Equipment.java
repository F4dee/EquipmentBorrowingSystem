package edu.cit.lastname.equipmentborrowingsystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String equipId; // e.g., EQ-001

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String tag; // e.g., LAPTOP, CAMERAS

    @Column(nullable = false)
    private String status; // e.g., AVAILABLE, ON LOAN, MAINTENANCE

    public Equipment() {}

    // Private constructor used by Builder
    private Equipment(Builder builder) {
        this.id = builder.id;
        this.equipId = builder.equipId;
        this.name = builder.name;
        this.tag = builder.tag;
        this.status = builder.status;
    }

    public Equipment(String equipId, String name, String tag, String status) {
        this.equipId = equipId;
        this.name = name;
        this.tag = tag;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getEquipId() { return equipId; }
    public void setEquipId(String equipId) { this.equipId = equipId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // Manual Builder implementation for the Creational Design Pattern requirement
    public static class Builder {
        private Long id;
        private String equipId;
        private String name;
        private String tag;
        private String status;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setEquipId(String equipId) {
            this.equipId = equipId;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setTag(String tag) {
            this.tag = tag;
            return this;
        }

        public Builder setStatus(String status) {
            this.status = status;
            return this;
        }

        public Equipment build() {
            return new Equipment(this);
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}

