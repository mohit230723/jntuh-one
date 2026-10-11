package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Test 3: Student Authentication & Command Desk Workflow")
public class StudentPortalE2ETest extends BaseE2ETest {

    @Test
    @DisplayName("Verify student login, dashboard metrics, attendance ledger, and fees account")
    void testStudentLoginAndDashboardWorkflow() {
        navigateTo("/login");

        // 1. Verify Login Form
        WebElement usernameInput = waitForElement(By.id("username-input"));
        WebElement passwordInput = waitForElement(By.id("password-input"));
        assertThat(usernameInput.isDisplayed()).isTrue();
        assertThat(passwordInput.isDisplayed()).isTrue();

        // 2. Click Quick Fill Student or Type Credentials
        click(By.id("quick-fill-student"));
        click(By.id("login-submit-btn"));

        // 3. Verify Navigation to Student Portal
        wait.until(d -> d.getCurrentUrl().contains("/portal/student"));
        assertThat(driver.getCurrentUrl()).contains("/portal/student");

        // 4. Assert Student Command Deck Header & Roll Number
        WebElement welcomeHeader = waitForElement(By.xpath("//h1[contains(text(), 'Welcome')]"));
        assertThat(welcomeHeader.isDisplayed()).isTrue();

        WebElement rollNumberText = waitForElement(By.xpath("//*[contains(text(), '23011A0501')]"));
        assertThat(rollNumberText.isDisplayed()).isTrue();

        // 5. Test Tab Switching: Attendance Ledger
        click(By.id("tab-attendance"));
        WebElement attendanceLedger = waitForElement(By.xpath("//*[contains(text(), 'Subject-Wise Attendance Ledger') or contains(text(), 'Overall Attendance')]"));
        assertThat(attendanceLedger.isDisplayed()).isTrue();

        // 6. Test Tab Switching: Results & Grade Card
        click(By.id("tab-results"));
        WebElement resultsView = waitForElement(By.xpath("//*[contains(text(), 'Grade Card') or contains(text(), 'SGPA')]"));
        assertThat(resultsView.isDisplayed()).isTrue();

        // 7. Test Tab Switching: Fees & Accounts
        click(By.id("tab-fees"));
        WebElement feeOverview = waitForElement(By.xpath("//*[contains(text(), 'Fee Ledger') or contains(text(), 'Tuition Fee') or contains(text(), 'Make Payment')]"));
        assertThat(feeOverview.isDisplayed()).isTrue();
    }
}
