package edu.jntuh.ucest.dto;

public class FacultyClassDto {
    private String courseCode;
    private String courseName;
    private Integer semester;
    private String section;
    private long totalStudents;

    public FacultyClassDto() {}

    public FacultyClassDto(String courseCode, String courseName, Integer semester, String section, long totalStudents) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.semester = semester;
        this.section = section;
        this.totalStudents = totalStudents;
    }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }
}
