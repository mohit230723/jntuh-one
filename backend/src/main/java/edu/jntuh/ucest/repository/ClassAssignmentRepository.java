package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.ClassAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassAssignmentRepository extends JpaRepository<ClassAssignment, Long> {
    List<ClassAssignment> findByFacultyId(Long facultyId);
    List<ClassAssignment> findByFacultyFacultyCode(String facultyCode);
    Optional<ClassAssignment> findByCourseCourseCodeAndSection(String courseCode, String section);
    Optional<ClassAssignment> findByFacultyFacultyCodeAndCourseCourseCode(String facultyCode, String courseCode);
}
