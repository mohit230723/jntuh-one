package edu.jntuh.ucest.dto;

import edu.jntuh.ucest.model.Notice;

import java.time.LocalDate;

public class NoticeDto {
    private Long id;
    private String title;
    private String category;
    private String description;
    private LocalDate postedDate;
    private boolean pinned;
    private String author;

    public NoticeDto() {}

    public NoticeDto(Long id, String title, String category, String description, LocalDate postedDate, boolean pinned, String author) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.postedDate = postedDate;
        this.pinned = pinned;
        this.author = author;
    }

    /** Copies only public fields, so the createdBy User (and its password hash) never reaches JSON. */
    public static NoticeDto from(Notice notice) {
        return new NoticeDto(
                notice.getId(),
                notice.getTitle(),
                notice.getCategory(),
                notice.getDescription(),
                notice.getPostedDate(),
                notice.isPinned(),
                notice.getAuthorName()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getPostedDate() { return postedDate; }
    public void setPostedDate(LocalDate postedDate) { this.postedDate = postedDate; }

    public boolean isPinned() { return pinned; }
    public void setPinned(boolean pinned) { this.pinned = pinned; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
}
