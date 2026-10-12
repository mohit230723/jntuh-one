package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class HomePageE2ETest extends BaseE2ETest {

    @Test
    void homePageShowsLatestNoticesFromTheApi() {
        navigateTo("/");
        waitForElement(By.tagName("h1"));
        // Notices come from the backend; with the mock fallback removed, an empty list or an error means the API is broken.
        assertThat(waitForElement(By.cssSelector("[data-testid='home-notice-item']")).isDisplayed()).isTrue();
        assertThat(driver.findElements(By.cssSelector("[data-testid='error-state']"))).isEmpty();
    }
}
