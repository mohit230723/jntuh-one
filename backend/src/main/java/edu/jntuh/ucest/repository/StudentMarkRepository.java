package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.StudentMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentMarkRepository extends JpaRepository<StudentMark, Long> {
    List<StudentMark> findByStudentRollNumber(String rollNumber);
    List<StudentMark> findByStudentRollNumberAndSemester(String rollNumber, Integer semester);
    Optional<StudentMark> findByStudentRollNumberAndCourseCourseCodeAndExamType(String rollNumber, String courseCode, String examType);
    List<StudentMark> findByCourseCourseCodeAndExamType(String courseCode, String examType);
}
