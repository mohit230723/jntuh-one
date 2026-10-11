package edu.jntuh.ucest.controller;

import edu.jntuh.ucest.model.Notice;
import edu.jntuh.ucest.repository.NoticeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicNoticeController {

    private final NoticeRepository noticeRepository;

    public PublicNoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @GetMapping("/notices")
    public ResponseEntity<Page<Notice>> getNotices(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        String categoryFilter = (category != null && !category.equalsIgnoreCase("ALL")) ? category.toUpperCase() : null;
        String searchFilter = (search != null && !search.trim().isEmpty()) ? search.trim() : null;

        Page<Notice> result = noticeRepository.searchNotices(categoryFilter, searchFilter, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/notices/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable Long id) {
        return noticeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/notices/latest")
    public ResponseEntity<List<Notice>> getLatestNotices() {
        return ResponseEntity.ok(noticeRepository.findTop5ByArchivedFalseOrderByPinnedDescPostedDateDesc());
    }

    @GetMapping("/events")
    public ResponseEntity<List<Notice>> getEvents() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Notice> eventsPage = noticeRepository.findByArchivedFalseAndCategoryOrderByPinnedDescPostedDateDesc("EVENTS", pageable);
        return ResponseEntity.ok(eventsPage.getContent());
    }
}
