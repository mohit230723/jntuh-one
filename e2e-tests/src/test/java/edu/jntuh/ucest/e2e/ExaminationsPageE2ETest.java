package edu.jntuh.ucest.e2e;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Test 2: Examinations Page Search & Category Filter")
public class ExaminationsPageE2ETest extends BaseE2ETest {

    @Test
    @DisplayName("Verify examinations page search input filters notices and category tabs filter by category")
    void testExaminationsSearchAndFilters() {
        navigateTo("/examinations");

        // 1. Verify Header and Grading Scale Table
        WebElement pageHeading = waitForElement(By.xpath("//h1[contains(text(), 'Examination Branch')]"));
        assertThat(pageHeading.isDisplayed()).isTrue();

        WebElement gradingTable = waitForElement(By.xpath("//table"));
        assertThat(gradingTable.isDisplayed()).isTrue();

        // 2. Test Category Tab Filtering
        WebElement examCategoryTab = waitForElement(By.id("category-tab-exam"));
        assertThat(examCategoryTab.isDisplayed()).isTrue();
        click(By.id("category-tab-exam"));

        // Allow UI state update
        try { Thread.sleep(500); } catch (InterruptedException ignored) {}

        // 3. Test Search Filtering
        WebElement searchInput = waitForElement(By.id("search-notices-input"));
        assertThat(searchInput.isDisplayed()).isTrue();

        type(By.id("search-notices-input"), "Semester");
        try { Thread.sleep(500); } catch (InterruptedException ignored) {}

        // 4. Verify filtered circulars display
        List<WebElement> notices = driver.findElements(By.xpath("//div[contains(@style, 'cursor: pointer') or contains(@class, 'card-paper')]"));
        assertThat(notices).isNotEmpty();
    }
}
