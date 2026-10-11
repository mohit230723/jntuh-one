package edu.jntuh.ucest.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance_sessions")
public class AttendanceSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_assignment_id", nullable = false)
    private ClassAssignment classAssignment;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "time_slot", nullable = false, length = 30)
    private String timeSlot;

    @Column(name = "topic_covered", length = 255)
    private String topicCovered;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public AttendanceSession() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ClassAssignment getClassAssignment() { return classAssignment; }
    public void setClassAssignment(ClassAssignment classAssignment) { this.classAssignment = classAssignment; }

    public LocalDate getSessionDate() { return sessionDate; }
    public void setSessionDate(LocalDate sessionDate) { this.sessionDate = sessionDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getTopicCovered() { return topicCovered; }
    public void setTopicCovered(String topicCovered) { this.topicCovered = topicCovered; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
