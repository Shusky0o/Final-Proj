import { test, expect, Page } from '@playwright/test';

async function mockFinancials(page : Page, year = "2026") {
  // Mock Disbursements (Expenses)
  await page.route(`**/disbursement/total/year?year=${year}`, async (route) => {
    await route.fulfill({
      json: {
        monthly: [
          { month: 1, total: 5000 }, // Jan
          { month: 2, total: 3000 }  // Feb
        ]
      }
    });
  });

  // Mock Revenue (Orders)
  await page.route(`**/orders/total/year?year=${year}`, async (route) => {
    await route.fulfill({
      json: {
        monthly: [
          { month: 1, total: 10000 },
          { month: 2, total: 8000 }
        ]
      }
    });
  });
}

test.describe('Financial Analysis - Expense Logging', () => {

  test('should successfully log a new expense', async ({ page }) => {
    await mockFinancials(page);

    // Mock the POST request for saving the expense
    await page.route('**/disbursement', async (route) => {
      expect(route.request().method()).toBe('POST');
      const postData = route.request().postDataJSON();
      expect(postData.name).toBe('Detergent Supplies');
      expect(postData.amount).toBe(1500);
      
      await route.fulfill({ status: 201, json: { success: true } });
    });

    await page.goto('http://localhost:3000/financial');

    // 1. Open the Modal via the FinancialSummary component
    await page.getByRole('button', { name: /Entry/i }).click();

    // 2. Verify Modal Header
    await expect(page.getByRole('heading', { name: /Log Expense/i })).toBeVisible();

    // 3. Fill in Item Description
    await page.getByPlaceholder(/e.g. 4 boxes of Detergent/i).fill('Detergent Supplies');

    // 4. Fill in Amount
    await page.getByPlaceholder('0.00').fill('1500');

    // 5. Fill in Transaction Date
    await page.locator('input[type="date"]').fill('2026-04-15');

    // 6. Save the Record
    await page.getByRole('button', { name: /Save Record/i }).click();

    // 7. Verify Modal is closed
    await expect(page.getByText('Disbursement Records')).toBeHidden();
  });

  test('should verify future months are locked', async ({ page }) => {
    await mockFinancials(page);
    await page.goto('http://localhost:3000/financial');

    const mayRow = page.locator('tr').filter({ hasText: 'May' });
    await expect(mayRow).toHaveClass(/opacity-30/);
    await expect(mayRow).toContainText('LOCKED');
    
    await mayRow.click();
    await expect(page.getByText('Timeline Breakdown')).toBeHidden();
  });
});