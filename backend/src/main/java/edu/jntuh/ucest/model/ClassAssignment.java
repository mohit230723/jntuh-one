package edu.jntuh.ucest.model;

import jakarta.persistence.*;

@Entity
@Table(name = "class_assignments")
public class ClassAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "faculty_id", nullable = false)
    private FacultyProfile faculty;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "academic_year", nullable = false, length = 10)
    private String academicYear = "2026-2027";

    @Column(nullable = false)
    private Integer semester = 5;

    @Column(nullable = false, length = 5)
    private String section = "A";

    public ClassAssignment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public FacultyProfile getFaculty() { return faculty; }
    public void setFaculty(FacultyProfile faculty) { this.faculty = faculty; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
}
