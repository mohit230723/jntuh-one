package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.AttendanceSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceSessionRepository extends JpaRepository<AttendanceSession, Long> {
    List<AttendanceSession> findByClassAssignmentIdOrderBySessionDateDesc(Long classAssignmentId);
    List<AttendanceSession> findByClassAssignmentCourseCourseCode(String courseCode);
    Optional<AttendanceSession> findByClassAssignmentIdAndSessionDateAndTimeSlot(Long classAssignmentId, LocalDate sessionDate, String timeSlot);
}
