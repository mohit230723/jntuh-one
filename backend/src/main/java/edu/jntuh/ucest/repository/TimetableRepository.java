package edu.jntuh.ucest.repository;

import edu.jntuh.ucest.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Integer> {
    List<Timetable> findByDepartmentCodeAndSemesterAndSection(String departmentCode, Integer semester, String section);
    List<Timetable> findByFacultyFacultyCode(String facultyCode);
}
