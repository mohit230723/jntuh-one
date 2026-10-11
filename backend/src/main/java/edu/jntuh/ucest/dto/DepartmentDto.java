package edu.jntuh.ucest.dto;

public class DepartmentDto {
    private Integer id;
    private String code;
    private String name;
    private Integer establishedYear;
    private String hodName;
    private String hodEmail;
    private Integer intake;
    private boolean featured;
    private String description;

    public DepartmentDto() {}

    public DepartmentDto(Integer id, String code, String name, Integer establishedYear, String hodName, String hodEmail, Integer intake, boolean featured, String description) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.establishedYear = establishedYear;
        this.hodName = hodName;
        this.hodEmail = hodEmail;
        this.intake = intake;
        this.featured = featured;
        this.description = description;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(Integer establishedYear) { this.establishedYear = establishedYear; }

    public String getHodName() { return hodName; }
    public void setHodName(String hodName) { this.hodName = hodName; }

    public String getHodEmail() { return hodEmail; }
    public void setHodEmail(String hodEmail) { this.hodEmail = hodEmail; }

    public Integer getIntake() { return intake; }
    public void setIntake(Integer intake) { this.intake = intake; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
