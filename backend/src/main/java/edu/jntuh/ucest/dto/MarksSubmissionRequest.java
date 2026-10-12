package edu.jntuh.ucest.dto;

import java.math.BigDecimal;
import java.util.List;

public class MarksSubmissionRequest {
    private String subjectCode;
    private String examType; // MID_1, MID_2, ASSIGNMENT, SEMESTER_END
    private BigDecimal maxMarks = new BigDecimal("30.00");
    private List<StudentMarkItem> marksList;

    public static class StudentMarkItem {
        private String rollNumber;
        private BigDecimal marksObtained;

        public StudentMarkItem() {}

        public StudentMarkItem(String rollNumber, BigDecimal marksObtained) {
            this.rollNumber = rollNumber;
            this.marksObtained = marksObtained;
        }

        public String getRollNumber() { return rollNumber; }
        public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

        public BigDecimal getMarksObtained() { return marksObtained; }
        public void setMarksObtained(BigDecimal marksObtained) { this.marksObtained = marksObtained; }
    }

    public MarksSubmissionRequest() {}

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getExamType() { return examType; }
    public void setExamType(String examType) { this.examType = examType; }

    public BigDecimal getMaxMarks() { return maxMarks; }
    public void setMaxMarks(BigDecimal maxMarks) { this.maxMarks = maxMarks; }

    public List<StudentMarkItem> getMarksList() { return marksList; }
    public void setMarksList(List<StudentMarkItem> marksList) { this.marksList = marksList; }
}
