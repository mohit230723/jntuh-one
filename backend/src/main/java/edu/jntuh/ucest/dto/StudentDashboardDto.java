package edu.jntuh.ucest.dto;

import java.math.BigDecimal;

public class StudentDashboardDto {
    private String rollNumber;
    private String name;
    private String branch;
    private Integer semester;
    private Double overallAttendancePercentage;
    private Double cgpa;
    private BigDecimal pendingFeeAmount;
    private long recentNoticesCount;

    public StudentDashboardDto() {}

    public StudentDashboardDto(String rollNumber, String name, String branch, Integer semester, Double overallAttendancePercentage, Double cgpa, BigDecimal pendingFeeAmount, long recentNoticesCount) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.branch = branch;
        this.semester = semester;
        this.overallAttendancePercentage = overallAttendancePercentage;
        this.cgpa = cgpa;
        this.pendingFeeAmount = pendingFeeAmount;
        this.recentNoticesCount = recentNoticesCount;
    }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Double getOverallAttendancePercentage() { return overallAttendancePercentage; }
    public void setOverallAttendancePercentage(Double overallAttendancePercentage) { this.overallAttendancePercentage = overallAttendancePercentage; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public BigDecimal getPendingFeeAmount() { return pendingFeeAmount; }
    public void setPendingFeeAmount(BigDecimal pendingFeeAmount) { this.pendingFeeAmount = pendingFeeAmount; }

    public long getRecentNoticesCount() { return recentNoticesCount; }
    public void setRecentNoticesCount(long recentNoticesCount) { this.recentNoticesCount = recentNoticesCount; }
}
