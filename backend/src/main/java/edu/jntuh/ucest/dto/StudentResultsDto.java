package edu.jntuh.ucest.dto;

import java.math.BigDecimal;
import java.util.List;

public class StudentResultsDto {
    private Integer semester;
    private Double sgpa;
    private Double cgpa;
    private BigDecimal creditsEarned;
    private List<SubjectGradeDto> grades;

    public StudentResultsDto() {}

    public StudentResultsDto(Integer semester, Double sgpa, Double cgpa, BigDecimal creditsEarned, List<SubjectGradeDto> grades) {
        this.semester = semester;
        this.sgpa = sgpa;
        this.cgpa = cgpa;
        this.creditsEarned = creditsEarned;
        this.grades = grades;
    }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Double getSgpa() { return sgpa; }
    public void setSgpa(Double sgpa) { this.sgpa = sgpa; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public BigDecimal getCreditsEarned() { return creditsEarned; }
    public void setCreditsEarned(BigDecimal creditsEarned) { this.creditsEarned = creditsEarned; }

    public List<SubjectGradeDto> getGrades() { return grades; }
    public void setGrades(List<SubjectGradeDto> grades) { this.grades = grades; }
}
