package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    Optional<Department> findByCode(String code);
    List<Department> findAllByOrderByEstablishedYearAsc();
}
