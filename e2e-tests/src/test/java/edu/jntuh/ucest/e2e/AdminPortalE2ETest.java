package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Test 5: Administrator Governance & System Control Workflow")
public class AdminPortalE2ETest extends BaseE2ETest {

    @Test
    @DisplayName("Verify administrator login, KPI metrics dashboard, notice management, and user provisioning tabs")
    void testAdminLoginAndGovernanceWorkflow() {
        navigateTo("/login");

        // 1. Authenticate with Administrator Quick Fill
        click(By.id("quick-fill-admin"));
        click(By.id("login-submit-btn"));

        // 2. Verify Redirect to Admin Command Console
        wait.until(d -> d.getCurrentUrl().contains("/portal/admin"));
        assertThat(driver.getCurrentUrl()).contains("/portal/admin");

        // 3. Verify System Command Console Header
        WebElement adminHeader = waitForElement(By.xpath("//h1[contains(text(), 'System Command Console')]"));
        assertThat(adminHeader.isDisplayed()).isTrue();

        // 4. Verify Metrics and KPI Cards (Enrolled Scholars / Active Faculty / Live Notices)
        WebElement metricsGrid = waitForElement(By.xpath("//*[contains(text(), 'Enrolled Scholars') or contains(text(), 'Active Faculty')]"));
        assertThat(metricsGrid.isDisplayed()).isTrue();

        // 5. Switch to Notice Management Tab
        click(By.id("admin-tab-notices"));
        WebElement noticeManagement = waitForElement(By.xpath("//*[contains(text(), 'Publish Official Notice') or contains(text(), 'Institutional Notice Management')]"));
        assertThat(noticeManagement.isDisplayed()).isTrue();

        // 6. Switch to User Provisioning Tab
        click(By.id("admin-tab-users"));
        WebElement userProvisioning = waitForElement(By.xpath("//*[contains(text(), 'Provision New Account') or contains(text(), 'Assign Role')]"));
        assertThat(userProvisioning.isDisplayed()).isTrue();
    }
}
