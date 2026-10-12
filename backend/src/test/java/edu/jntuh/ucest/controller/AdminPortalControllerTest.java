package edu.jntuh.ucest.controller;

import edu.jntuh.ucest.dto.AdminStatsDto;
import edu.jntuh.ucest.dto.NoticeCreateRequest;
import edu.jntuh.ucest.dto.NoticeDto;
import edu.jntuh.ucest.dto.UserCreationRequest;
import edu.jntuh.ucest.model.*;
import edu.jntuh.ucest.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminPortalControllerTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private StudentProfileRepository studentRepository;
    @Mock
    private FacultyProfileRepository facultyRepository;
    @Mock
    private DepartmentRepository departmentRepository;
    @Mock
    private NoticeRepository noticeRepository;
    @Mock
    private FeeRecordRepository feeRecordRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminPortalController adminPortalController;

    @Test
    void testGetStats() {
        when(studentRepository.count()).thenReturn(60L);
        when(facultyRepository.count()).thenReturn(12L);
        when(noticeRepository.countByArchivedFalse()).thenReturn(8L);
        when(departmentRepository.count()).thenReturn(12L);
        when(feeRecordRepository.sumTotalFeeCollected()).thenReturn(new BigDecimal("1980000.00"));

        ResponseEntity<AdminStatsDto> response = adminPortalController.getStats();

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(60L, response.getBody().getTotalStudents());
        assertEquals(12L, response.getBody().getTotalFaculty());
        assertEquals(8L, response.getBody().getActiveNotices());
    }

    @Test
    void testCreateNotice() {
        NoticeCreateRequest req = new NoticeCreateRequest();
        req.setTitle("New Tech Symposium 2026");
        req.setCategory("EVENTS");
        req.setDescription("All students invited to participate.");
        req.setPinned(true);
        req.setAuthor("CSE Dept");

        Notice mockSaved = new Notice();
        mockSaved.setId(10L);
        mockSaved.setTitle(req.getTitle());
        mockSaved.setCategory("EVENTS");
        when(noticeRepository.save(any(Notice.class))).thenReturn(mockSaved);

        ResponseEntity<NoticeDto> response = adminPortalController.createNotice(req);

        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("New Tech Symposium 2026", response.getBody().getTitle());
    }

    @Test
    void testProvisionUserSuccess() {
        UserCreationRequest req = new UserCreationRequest();
        req.setUsername("23011A0561");
        req.setEmail("23011a0561@ucest.edu");
        req.setPassword("pass123");
        req.setFullName("K. Vikram");
        req.setRole("ROLE_STUDENT");
        req.setDepartment("CSE");

        when(userRepository.findByUsername("23011A0561")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("pass123")).thenReturn("hashedPass");

        User savedUser = new User("23011A0561", "23011a0561@ucest.edu", "hashedPass", Role.ROLE_STUDENT);
        savedUser.setId(101L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        Department dept = new Department();
        dept.setCode("CSE");
        when(departmentRepository.findByCode("CSE")).thenReturn(Optional.of(dept));

        ResponseEntity<Map<String, Object>> response = adminPortalController.provisionUser(req);

        assertEquals(201, response.getStatusCode().value());
        assertEquals("SUCCESS", response.getBody().get("status"));
        assertEquals("23011A0561", response.getBody().get("username"));
    }
}
