package edu.jntuh.ucest.dto;

public class StudentListItemDto {
    private String rollNumber;
    private String name;
    private String section;

    public StudentListItemDto() {}

    public StudentListItemDto(String rollNumber, String name, String section) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.section = section;
    }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
}
