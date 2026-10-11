package edu.jntuh.ucest.dto;

import java.util.List;

public class AttendanceSubmissionRequest {
    private String subjectCode;
    private String date; // YYYY-MM-DD
    private String timeSlot;
    private String topicCovered;
    private List<StudentStatus> attendanceList;

    public static class StudentStatus {
        private String rollNumber;
        private boolean present;

        public StudentStatus() {}

        public StudentStatus(String rollNumber, boolean present) {
            this.rollNumber = rollNumber;
            this.present = present;
        }

        public String getRollNumber() { return rollNumber; }
        public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

        public boolean isPresent() { return present; }
        public void setPresent(boolean present) { this.present = present; }
    }

    public AttendanceSubmissionRequest() {}

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getTopicCovered() { return topicCovered; }
    public void setTopicCovered(String topicCovered) { this.topicCovered = topicCovered; }

    public List<StudentStatus> getAttendanceList() { return attendanceList; }
    public void setAttendanceList(List<StudentStatus> attendanceList) { this.attendanceList = attendanceList; }
}
