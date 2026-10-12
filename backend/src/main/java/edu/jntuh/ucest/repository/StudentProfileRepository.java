package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByRollNumber(String rollNumber);
    Optional<StudentProfile> findByUserUsername(String username);
    List<StudentProfile> findByDepartmentCodeAndCurrentSemesterAndSectionOrderByRollNumberAsc(String departmentCode, Integer currentSemester, String section);
    List<StudentProfile> findByDepartmentIdAndCurrentSemesterAndSectionOrderByRollNumberAsc(Integer departmentId, Integer currentSemester, String section);
}
