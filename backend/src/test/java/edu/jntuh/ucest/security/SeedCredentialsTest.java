package edu.jntuh.ucest.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Guards the demo logins: every seeded user's BCrypt hash must match the
 * password documented in the README for its role.
 */
public class SeedCredentialsTest {

    private static final Path SEED_FILE = Path.of("..", "db", "seed.sql");
    private static final Path K8S_SEED_FILE = Path.of("..", "k8s", "init-scripts", "02-seed.sql");

    private static final Map<String, String> PASSWORD_BY_ROLE = Map.of(
            "ROLE_ADMIN", "admin123",
            "ROLE_FACULTY", "faculty123",
            "ROLE_STUDENT", "student123"
    );

    // Matches: (id, 'username', 'email', '$2a$10$...', 'ROLE_X', TRUE)
    private static final Pattern USER_ROW = Pattern.compile(
            "\\(\\d+, '([^']+)', '[^']+', '(\\$2[aby]\\$\\d{2}\\$[^']+)', '(ROLE_[A-Z]+)'");

    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Test
    void everySeededUserCanLogInWithDocumentedPassword() throws IOException {
        Matcher rows = USER_ROW.matcher(Files.readString(SEED_FILE, StandardCharsets.UTF_8));
        int checked = 0;

        while (rows.find()) {
            String username = rows.group(1);
            String hash = rows.group(2);
            String role = rows.group(3);
            String password = PASSWORD_BY_ROLE.get(role);

            assertNotNull(password, "No documented password for role " + role);
            assertTrue(encoder.matches(password, hash),
                    "Seeded hash for " + username + " does not match '" + password + "'");
            checked++;
        }

        assertTrue(checked > 0, "No users found in " + SEED_FILE);
    }

    @Test
    void kubernetesSeedIsIdenticalToComposeSeed() throws IOException {
        assertEquals(
                Files.readString(SEED_FILE, StandardCharsets.UTF_8),
                Files.readString(K8S_SEED_FILE, StandardCharsets.UTF_8),
                "k8s/init-scripts/02-seed.sql must be a copy of db/seed.sql");
    }
}
