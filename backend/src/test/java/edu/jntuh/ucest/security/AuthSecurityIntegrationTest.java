package edu.jntuh.ucest.security;

import edu.jntuh.ucest.model.Role;
import edu.jntuh.ucest.model.User;
import edu.jntuh.ucest.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Sends real HTTP requests through the Spring Security filter chain (H2 test database)
 * to check login, JWT and role rules.
 */
@SpringBootTest
@AutoConfigureMockMvc
public class AuthSecurityIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @BeforeEach
    void createUsers() {
        userRepository.deleteAll();
        userRepository.save(new User("test-admin", "admin@test.edu", passwordEncoder.encode("admin123"), Role.ROLE_ADMIN));
        userRepository.save(new User("test-student", "student@test.edu", passwordEncoder.encode("student123"), Role.ROLE_STUDENT));
    }

    @Test
    void loginWithCorrectPasswordReturnsJwtAndRole() throws Exception {
        mockMvc.perform(login("test-student", "student123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.role").value("ROLE_STUDENT"));
    }

    @Test
    void loginWithWrongPasswordReturns401() throws Exception {
        mockMvc.perform(login("test-admin", "wrong-password"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid username or password"));
    }

    @Test
    void loginWithBlankFieldsReturns400WithFieldErrors() throws Exception {
        mockMvc.perform(login("", ""))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.username").exists())
                .andExpect(jsonPath("$.errors.password").exists());
    }

    @Test
    void portalApiWithoutTokenReturns401() throws Exception {
        mockMvc.perform(get("/api/student/dashboard"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void portalApiWithForgedTokenReturns401() throws Exception {
        mockMvc.perform(get("/api/student/dashboard").header("Authorization", "Bearer not-a-real-jwt"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void studentCallingAdminApiReturns403() throws Exception {
        String token = tokenFor("test-student", "student123");

        mockMvc.perform(get("/api/admin/stats").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    @Test
    void adminCanCallAdminApi() throws Exception {
        String token = tokenFor("test-admin", "admin123");

        mockMvc.perform(get("/api/admin/stats").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    private static org.springframework.test.web.servlet.RequestBuilder login(String username, String password) {
        return post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}");
    }

    private String tokenFor(String username, String password) throws Exception {
        MvcResult result = mockMvc.perform(login(username, password)).andExpect(status().isOk()).andReturn();
        String body = result.getResponse().getContentAsString();
        return body.replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }
}
