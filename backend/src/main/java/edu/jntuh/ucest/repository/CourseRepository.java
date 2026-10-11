package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    Optional<Course> findByCourseCode(String courseCode);
    List<Course> findByDepartmentCodeAndSemester(String departmentCode, Integer semester);
}
