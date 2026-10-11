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
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Notice> result;

        if (category != null && !category.equalsIgnoreCase("ALL")) {
            result = noticeRepository.findByArchivedFalseAndCategoryOrderByPinnedDescPostedDateDesc(category.toUpperCase(), pageable);
        } else {
            result = noticeRepository.findByArchivedFalseOrderByPinnedDescPostedDateDesc(pageable);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/notices/latest")
    public ResponseEntity<List<Notice>> getLatestNotices() {
        return ResponseEntity.ok(noticeRepository.findTop5ByArchivedFalseOrderByPinnedDescPostedDateDesc());
    }
}
