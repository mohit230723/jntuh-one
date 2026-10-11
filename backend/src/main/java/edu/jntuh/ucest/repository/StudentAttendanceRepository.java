package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.StudentAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
    List<StudentAttendance> findByStudentId(Long studentId);
    List<StudentAttendance> findByStudentRollNumber(String rollNumber);
    long countByStudentRollNumber(String rollNumber);
    long countByStudentRollNumberAndPresentTrue(String rollNumber);

    @Query("SELECT COUNT(sa) FROM StudentAttendance sa " +
           "WHERE sa.student.rollNumber = :rollNumber " +
           "AND sa.attendanceSession.classAssignment.course.courseCode = :courseCode")
    long countConductedForStudentAndCourse(@Param("rollNumber") String rollNumber, @Param("courseCode") String courseCode);

    @Query("SELECT COUNT(sa) FROM StudentAttendance sa " +
           "WHERE sa.student.rollNumber = :rollNumber " +
           "AND sa.attendanceSession.classAssignment.course.courseCode = :courseCode " +
           "AND sa.present = true")
    long countAttendedForStudentAndCourse(@Param("rollNumber") String rollNumber, @Param("courseCode") String courseCode);
}
