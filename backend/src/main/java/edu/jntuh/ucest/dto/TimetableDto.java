package edu.jntuh.ucest.dto;

public class TimetableDto {
    private Integer id;
    private String dayOfWeek;
    private String timeSlot;
    private String courseCode;
    private String courseName;
    private String facultyName;
    private String roomNumber;

    public TimetableDto() {}

    public TimetableDto(Integer id, String dayOfWeek, String timeSlot, String courseCode, String courseName, String facultyName, String roomNumber) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.timeSlot = timeSlot;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.facultyName = facultyName;
        this.roomNumber = roomNumber;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
}
