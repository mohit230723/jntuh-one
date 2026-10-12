package edu.jntuh.ucest.controller;

import edu.jntuh.ucest.dto.DepartmentDto;
import edu.jntuh.ucest.model.Department;
import edu.jntuh.ucest.repository.DepartmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/departments")
public class PublicDepartmentController {

    private final DepartmentRepository departmentRepository;

    public PublicDepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        List<DepartmentDto> list = departmentRepository.findAllByOrderByEstablishedYearAsc().stream()
                .map(d -> new DepartmentDto(
                        d.getId(),
                        d.getCode(),
                        d.getName(),
                        d.getEstablishedYear(),
                        d.getHodName(),
                        d.getHodEmail(),
                        d.getIntake(),
                        d.isFeatured(),
                        d.getDescription()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{code}")
    public ResponseEntity<DepartmentDto> getDepartmentByCode(@PathVariable String code) {
        return departmentRepository.findByCode(code.toUpperCase())
                .map(d -> ResponseEntity.ok(new DepartmentDto(
                        d.getId(),
                        d.getCode(),
                        d.getName(),
                        d.getEstablishedYear(),
                        d.getHodName(),
                        d.getHodEmail(),
                        d.getIntake(),
                        d.isFeatured(),
                        d.getDescription()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
