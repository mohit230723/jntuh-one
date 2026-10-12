package edu.jntuh.ucest.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_attendance", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"attendance_session_id", "student_id"})
})
public class StudentAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attendance_session_id", nullable = false)
    private AttendanceSession attendanceSession;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(name = "is_present", nullable = false)
    private boolean present = true;

    @Column(length = 100)
    private String remarks;

    public StudentAttendance() {}

    public StudentAttendance(AttendanceSession session, StudentProfile student, boolean present) {
        this.attendanceSession = session;
        this.student = student;
        this.present = present;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AttendanceSession getAttendanceSession() { return attendanceSession; }
    public void setAttendanceSession(AttendanceSession attendanceSession) { this.attendanceSession = attendanceSession; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public boolean isPresent() { return present; }
    public void setPresent(boolean present) { this.present = present; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
