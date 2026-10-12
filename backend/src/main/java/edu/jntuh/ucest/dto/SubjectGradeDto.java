package edu.jntuh.ucest.dto;

import java.math.BigDecimal;

public class SubjectGradeDto {
    private String subjectCode;
    private String subjectName;
    private String grade;
    private Integer gradePoints;
    private BigDecimal credits;
    private String status;

    public SubjectGradeDto() {}

    public SubjectGradeDto(String subjectCode, String subjectName, String grade, Integer gradePoints, BigDecimal credits, String status) {
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.grade = grade;
        this.gradePoints = gradePoints;
        this.credits = credits;
        this.status = status;
    }

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public Integer getGradePoints() { return gradePoints; }
    public void setGradePoints(Integer gradePoints) { this.gradePoints = gradePoints; }

    public BigDecimal getCredits() { return credits; }
    public void setCredits(BigDecimal credits) { this.credits = credits; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
