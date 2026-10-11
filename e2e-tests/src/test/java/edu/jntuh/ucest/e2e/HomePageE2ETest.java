package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Test 1: Public Homepage & Notices Verification")
public class HomePageE2ETest extends BaseE2ETest {

    @Test
    @DisplayName("Verify homepage renders, displays brand identity, marquee dispatch, and notice ticker")
    void testHomepageLoadsAndDisplaysNotices() {
        navigateTo("/");

        // 1. Verify Page Title
        String pageTitle = driver.getTitle();
        assertThat(pageTitle).contains("UCEST");

        // 2. Verify Top Sticky Navigation & Brand Wordmark
        WebElement brandWordmark = waitForElement(By.xpath("//span[contains(text(), 'UCEST ONE')]"));
        assertThat(brandWordmark.isDisplayed()).isTrue();

        // 3. Verify Top Emergency Marquee Banner
        WebElement marquee = waitForPresence(By.xpath("//div[contains(@style, 'background') and contains(., 'CRITICAL NOTICE')]"));
        assertThat(marquee.isDisplayed()).isTrue();

        // 4. Verify Latest Official Circulars Section & Notice Items
        WebElement circularsHeading = waitForElement(By.xpath("//h2[contains(text(), 'Latest Official Circulars')]"));
        assertThat(circularsHeading.isDisplayed()).isTrue();

        List<WebElement> noticeCards = driver.findElements(By.cssSelector("[data-testid='home-notice-item']"));
        assertThat(noticeCards).isNotEmpty();

        // Verify First Notice Card has title and read link
        WebElement firstNotice = noticeCards.get(0);
        assertThat(firstNotice.getText()).isNotEmpty();
    }
}
