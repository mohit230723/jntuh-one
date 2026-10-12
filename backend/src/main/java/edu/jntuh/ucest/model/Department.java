package edu.jntuh.ucest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 10)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "established_year", nullable = false)
    private Integer establishedYear = 1965;

    @Column(name = "hod_name", nullable = false, length = 100)
    private String hodName;

    @Column(name = "hod_email", length = 100)
    private String hodEmail;

    @Column(nullable = false)
    private Integer intake = 60;

    @Column(name = "is_featured", nullable = false)
    private boolean featured = false;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Department() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(Integer establishedYear) { this.establishedYear = establishedYear; }

    public String getHodName() { return hodName; }
    public void setHodName(String hodName) { this.hodName = hodName; }

    public String getHodEmail() { return hodEmail; }
    public void setHodEmail(String hodEmail) { this.hodEmail = hodEmail; }

    public Integer getIntake() { return intake; }
    public void setIntake(Integer intake) { this.intake = intake; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
