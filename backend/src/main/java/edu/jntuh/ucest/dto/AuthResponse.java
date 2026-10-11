package edu.jntuh.ucest.dto;

public class AuthResponse {

    private String token;
    private long expiresIn;
    private UserSummary user;

    public AuthResponse(String token, long expiresIn, UserSummary user) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.user = user;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long expiresIn) { this.expiresIn = expiresIn; }

    public UserSummary getUser() { return user; }
    public void setUser(UserSummary user) { this.user = user; }

    public static class UserSummary {
        private Long id;
        private String username;
        private String email;
        private String role;
        private String name;

        public UserSummary(Long id, String username, String email, String role, String name) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.role = role;
            this.name = name;
        }

        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
        public String getName() { return name; }
    }
}
