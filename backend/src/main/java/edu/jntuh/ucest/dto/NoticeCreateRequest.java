package edu.jntuh.ucest.dto;

import jakarta.validation.constraints.NotBlank;

public class NoticeCreateRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String category; // ACADEMIC, EXAM, EVENTS, GENERAL

    @NotBlank
    private String description;

    private boolean pinned = false;

    private String author = "Administration";

    public NoticeCreateRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isPinned() { return pinned; }
    public void setPinned(boolean pinned) { this.pinned = pinned; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
}
