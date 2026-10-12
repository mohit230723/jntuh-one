package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class FacultyPortalE2ETest extends BaseE2ETest {

    @Test
    void facultyLogsInAndSeesAssignedClasses() {
        loginWithQuickFill("quick-fill-faculty", "/portal/faculty");

        assertThat(waitForElement(By.xpath("//*[contains(text(), 'CS501PC')]")).isDisplayed()).isTrue();
        click(By.id("faculty-tab-marks"));
        click(By.id("faculty-tab-attendance"));
        assertThat(driver.findElements(By.cssSelector("[data-testid='error-state']"))).isEmpty();
    }
}
