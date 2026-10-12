package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class AdminPortalE2ETest extends BaseE2ETest {

    @Test
    void adminPostsNoticeAndItAppearsOnPublicSite() {
        String title = "Selenium notice " + System.currentTimeMillis();

        loginWithQuickFill("quick-fill-admin", "/portal/admin");
        click(By.id("admin-tab-notices"));
        type(By.cssSelector("input[placeholder^='e.g. Autonomous B.Tech']"), title);
        type(By.cssSelector("textarea[placeholder^='Provide full announcement']"), "Posted by the automated Selenium test.");
        click(By.xpath("//form[.//textarea]//button[@type='submit']"));
        waitForElement(By.xpath("//*[contains(text(), '" + title + "')]"));

        // The public notices page reads from the same database, so the notice is visible immediately.
        navigateTo("/examinations");
        type(By.id("search-notices-input"), title);
        assertThat(waitForElement(By.xpath("//*[contains(text(), '" + title + "')]")).isDisplayed()).isTrue();
    }
}
