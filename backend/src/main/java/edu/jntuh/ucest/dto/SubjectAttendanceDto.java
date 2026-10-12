package edu.jntuh.ucest.dto;

public class SubjectAttendanceDto {
    private String subjectCode;
    private String subjectName;
    private String facultyName;
    private long conducted;
    private long attended;
    private double percentage;
    private boolean warning;

    public SubjectAttendanceDto() {}

    public SubjectAttendanceDto(String subjectCode, String subjectName, String facultyName, long conducted, long attended, double percentage, boolean warning) {
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.facultyName = facultyName;
        this.conducted = conducted;
        this.attended = attended;
        this.percentage = percentage;
        this.warning = warning;
    }

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }

    public long getConducted() { return conducted; }
    public void setConducted(long conducted) { this.conducted = conducted; }

    public long getAttended() { return attended; }
    public void setAttended(long attended) { this.attended = attended; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }

    public boolean isWarning() { return warning; }
    public void setWarning(boolean warning) { this.warning = warning; }
}
