package edu.jntuh.ucest.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @Column(name = "course_code", nullable = false, unique = true, length = 20)
    private String courseCode;

    @Column(name = "course_name", nullable = false, length = 120)
    private String courseName;

    @Column(nullable = false)
    private Integer semester;

    @Column(nullable = false, precision = 3, scale = 1)
    private BigDecimal credits = new BigDecimal("3.0");

    @Column(name = "course_type", nullable = false, length = 30)
    private String courseType = "PROFESSIONAL_CORE";

    @Column(name = "syllabus_summary", columnDefinition = "TEXT")
    private String syllabusSummary;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Course() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public BigDecimal getCredits() { return credits; }
    public void setCredits(BigDecimal credits) { this.credits = credits; }

    public String getCourseType() { return courseType; }
    public void setCourseType(String courseType) { this.courseType = courseType; }

    public String getSyllabusSummary() { return syllabusSummary; }
    public void setSyllabusSummary(String syllabusSummary) { this.syllabusSummary = syllabusSummary; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
