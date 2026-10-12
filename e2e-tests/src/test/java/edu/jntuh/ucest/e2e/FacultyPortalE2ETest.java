package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Test 4: Faculty Authentication & Instruction Desk Workflow")
public class FacultyPortalE2ETest extends BaseE2ETest {

    @Test
    @DisplayName("Verify faculty login, assigned course cohorts, and attendance register / marks entry tabs")
    void testFacultyLoginAndClassManagement() {
        navigateTo("/login");

        // 1. Authenticate with Faculty Quick Fill
        click(By.id("quick-fill-faculty"));
        click(By.id("login-submit-btn"));

        // 2. Verify Redirect to Faculty Portal
        wait.until(d -> d.getCurrentUrl().contains("/portal/faculty"));
        assertThat(driver.getCurrentUrl()).contains("/portal/faculty");

        // 3. Verify Faculty Dashboard Identity
        WebElement facultyHeader = waitForElement(By.xpath("//h1[contains(text(), 'Welcome')]"));
        assertThat(facultyHeader.isDisplayed()).isTrue();

        // 4. Verify Assigned Course Cohorts Card
        WebElement cohortCard = waitForElement(By.xpath("//*[contains(text(), 'Assigned Course Cohorts') or contains(text(), 'CS501PC')]"));
        assertThat(cohortCard.isDisplayed()).isTrue();

        // 5. Test Tab Switching: Enter Internal Marks
        click(By.id("faculty-tab-marks"));
        WebElement marksRegister = waitForElement(By.xpath("//*[contains(text(), 'Internal Marks Entry') or contains(text(), 'Mid-1')]"));
        assertThat(marksRegister.isDisplayed()).isTrue();

        // 6. Test Tab Switching: Mark Class Attendance
        click(By.id("faculty-tab-attendance"));
        WebElement attRegister = waitForElement(By.xpath("//*[contains(text(), 'Attendance Register')]"));
        assertThat(attRegister.isDisplayed()).isTrue();
    }
}
