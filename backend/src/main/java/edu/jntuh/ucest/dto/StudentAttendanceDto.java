package edu.jntuh.ucest.dto;

import java.util.List;

public class StudentAttendanceDto {
    private double overallPercentage;
    private long totalClassesConducted;
    private long totalClassesAttended;
    private List<SubjectAttendanceDto> subjects;

    public StudentAttendanceDto() {}

    public StudentAttendanceDto(double overallPercentage, long totalClassesConducted, long totalClassesAttended, List<SubjectAttendanceDto> subjects) {
        this.overallPercentage = overallPercentage;
        this.totalClassesConducted = totalClassesConducted;
        this.totalClassesAttended = totalClassesAttended;
        this.subjects = subjects;
    }

    public double getOverallPercentage() { return overallPercentage; }
    public void setOverallPercentage(double overallPercentage) { this.overallPercentage = overallPercentage; }

    public long getTotalClassesConducted() { return totalClassesConducted; }
    public void setTotalClassesConducted(long totalClassesConducted) { this.totalClassesConducted = totalClassesConducted; }

    public long getTotalClassesAttended() { return totalClassesAttended; }
    public void setTotalClassesAttended(long totalClassesAttended) { this.totalClassesAttended = totalClassesAttended; }

    public List<SubjectAttendanceDto> getSubjects() { return subjects; }
    public void setSubjects(List<SubjectAttendanceDto> subjects) { this.subjects = subjects; }
}
