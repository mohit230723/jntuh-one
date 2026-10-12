package edu.jntuh.ucest.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.jntuh.ucest.dto.NoticeDto;
import edu.jntuh.ucest.model.Notice;
import edu.jntuh.ucest.model.User;
import edu.jntuh.ucest.repository.NoticeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PublicNoticeControllerTest {

    @Mock
    private NoticeRepository noticeRepository;

    @InjectMocks
    private PublicNoticeController publicNoticeController;

    private Notice testNotice;

    @BeforeEach
    void setUp() {
        testNotice = new Notice();
        testNotice.setId(1L);
        testNotice.setTitle("Semester End Examination Schedule");
        testNotice.setCategory("EXAM");
        testNotice.setDescription("Autonomous B.Tech schedule released.");
        testNotice.setPostedDate(LocalDate.now());
        testNotice.setPinned(true);
        testNotice.setAuthorName("Exam Branch");
    }

    @Test
    void testGetNoticesWithCategoryAndSearch() {
        Page<Notice> page = new PageImpl<>(List.of(testNotice));
        when(noticeRepository.searchNotices(eq("EXAM"), eq("Schedule"), any(Pageable.class)))
                .thenReturn(page);

        ResponseEntity<Page<NoticeDto>> response = publicNoticeController.getNotices("EXAM", "Schedule", 0, 10);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().getTotalElements());
        assertEquals("Semester End Examination Schedule", response.getBody().getContent().get(0).getTitle());
    }

    @Test
    void testGetNoticeByIdFound() {
        when(noticeRepository.findById(1L)).thenReturn(Optional.of(testNotice));

        ResponseEntity<NoticeDto> response = publicNoticeController.getNoticeById(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("EXAM", response.getBody().getCategory());
    }

    @Test
    void publicNoticeJsonDoesNotExposeAuthorAccount() throws Exception {
        User author = new User();
        author.setUsername("admin");
        author.setPassword("$2a$10$secretHashThatMustNeverBePublic");
        testNotice.setCreatedBy(author);
        when(noticeRepository.findTop5ByArchivedFalseOrderByPinnedDescPostedDateDesc())
                .thenReturn(List.of(testNotice));

        ResponseEntity<List<NoticeDto>> response = publicNoticeController.getLatestNotices();
        String json = new ObjectMapper().registerModule(new JavaTimeModule())
                .writeValueAsString(response.getBody());

        assertTrue(json.contains("Semester End Examination Schedule"));
        assertTrue(json.contains("\"author\":\"Exam Branch\""));
        assertFalse(json.contains("password"), "JSON leaks a password field: " + json);
        assertFalse(json.contains("createdBy"), "JSON leaks the author's account: " + json);
    }

    @Test
    void testGetNoticeByIdNotFound() {
        when(noticeRepository.findById(99L)).thenReturn(Optional.empty());

        ResponseEntity<NoticeDto> response = publicNoticeController.getNoticeById(99L);

        assertEquals(404, response.getStatusCode().value());
    }
}
