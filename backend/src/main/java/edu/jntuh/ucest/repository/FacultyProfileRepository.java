package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.FacultyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacultyProfileRepository extends JpaRepository<FacultyProfile, Long> {
    Optional<FacultyProfile> findByFacultyCode(String facultyCode);
    Optional<FacultyProfile> findByUserUsername(String username);
    List<FacultyProfile> findByDepartmentCodeOrderByDesignationDesc(String departmentCode);
}
