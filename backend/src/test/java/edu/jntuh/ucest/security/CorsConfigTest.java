package edu.jntuh.ucest.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** The Kubernetes site (NodePort 30080) must be allowed to call the API from the browser. */
@SpringBootTest
@AutoConfigureMockMvc
public class CorsConfigTest {

    @Autowired private MockMvc mockMvc;

    @Test
    void kubernetesFrontendOriginIsAllowed() throws Exception {
        mockMvc.perform(get("/api/public/notices").header("Origin", "http://localhost:30080"))
                .andExpect(status().isOk());
    }

    @Test
    void unknownOriginIsRejected() throws Exception {
        mockMvc.perform(get("/api/public/notices").header("Origin", "http://evil.example"))
                .andExpect(status().isForbidden());
    }
}
