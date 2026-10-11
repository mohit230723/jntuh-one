package edu.jntuh.ucest.dto;

import java.math.BigDecimal;

public class AdminStatsDto {
    private long totalStudents;
    private long totalFaculty;
    private long activeNotices;
    private long departmentsCount;
    private BigDecimal totalFeeCollected;

    public AdminStatsDto() {}

    public AdminStatsDto(long totalStudents, long totalFaculty, long activeNotices, long departmentsCount, BigDecimal totalFeeCollected) {
        this.totalStudents = totalStudents;
        this.totalFaculty = totalFaculty;
        this.activeNotices = activeNotices;
        this.departmentsCount = departmentsCount;
        this.totalFeeCollected = totalFeeCollected;
    }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalFaculty() { return totalFaculty; }
    public void setTotalFaculty(long totalFaculty) { this.totalFaculty = totalFaculty; }

    public long getActiveNotices() { return activeNotices; }
    public void setActiveNotices(long activeNotices) { this.activeNotices = activeNotices; }

    public long getDepartmentsCount() { return departmentsCount; }
    public void setDepartmentsCount(long departmentsCount) { this.departmentsCount = departmentsCount; }

    public BigDecimal getTotalFeeCollected() { return totalFeeCollected; }
    public void setTotalFeeCollected(BigDecimal totalFeeCollected) { this.totalFeeCollected = totalFeeCollected; }
}
