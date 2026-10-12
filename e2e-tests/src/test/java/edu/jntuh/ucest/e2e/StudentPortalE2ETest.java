package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class StudentPortalE2ETest extends BaseE2ETest {

    @Test
    void studentLogsInAndSeesOwnDashboard() {
        loginWithQuickFill("quick-fill-student", "/portal/student");

        assertThat(waitForElement(By.xpath("//h1[contains(text(), 'Welcome')]")).isDisplayed()).isTrue();
        assertThat(waitForElement(By.xpath("//*[contains(text(), '23011A0501')]")).isDisplayed()).isTrue();
        assertThat(driver.findElements(By.cssSelector("[data-testid='error-state']"))).isEmpty();
    }

    @Test
    void wrongPasswordIsRejected() {
        navigateTo("/login");
        type(By.id("username-input"), "23011A0501");
        type(By.id("password-input"), "definitely-wrong");
        click(By.id("login-submit-btn"));

        assertThat(getElementText(By.cssSelector("[data-testid='login-error']"))).contains("Invalid username or password");
        assertThat(driver.getCurrentUrl()).contains("/login");
    }
}
