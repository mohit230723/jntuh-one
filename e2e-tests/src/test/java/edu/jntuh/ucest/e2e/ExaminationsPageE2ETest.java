package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThat;

public class ExaminationsPageE2ETest extends BaseE2ETest {

    @Test
    void noticeSearchFiltersTheList() {
        navigateTo("/examinations");
        waitForElement(By.xpath("//*[contains(text(), 'Semester End Examination')]"));

        type(By.id("search-notices-input"), "Semester End");

        assertThat(waitForElement(By.xpath("//*[contains(text(), 'Semester End Examination')]")).isDisplayed()).isTrue();
        assertThat(driver.findElements(By.cssSelector("[data-testid='error-state']"))).isEmpty();
    }
}
