import { test, expect, Page } from '@playwright/test';
import { describe } from 'node:test';

async function mockDashboardData(page: Page, options = { pendingCount: 0, latestId: 1024, todayTotal: 0 }) {
  await page.route('**/orders?limit=20', async (route) => {
    await route.fulfill({ json: { data: [], hasMore: false } });
  });

  await page.route('**/orders/status-summary?status=pending', async (route) => {
    await route.fulfill({ json: { count: options.pendingCount } });
  });

  await page.route('**/orders/today-total', async (route) => {
    await route.fulfill({ json: { total: options.todayTotal } });
  });

  await page.route('**/orders/total/year?year=*', async (route) => {
    await route.fulfill({ json: { monthly: [] } });
  });

  await page.route('**/orders/latest', async (route) => {
    await route.fulfill({ json: { id: options.latestId } });
  });

  await page.route('**/orders', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 201, json: { message: 'Success' } });
    } else {
      await route.continue(); // Let other GET requests through if they don't match the mocks above
    }
  });
}

test.describe('Order Creation Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Default mocks for every test in this describe block
        await mockDashboardData(page);
    });
  
    test('should successfully create a new order from the dashboard', async ({ page }) => {

        // --- STEP-BY-STEP SIMULATION ---

        await page.goto('http://localhost:3000/');

        // Click "New Order" button in CommandCenter
        await page.getByRole('button', { name: /New Order/i }).click();

        // Verify Modal is open and shows the correct incremented ID (#1025)
        const modal = page.getByRole('dialog');
        await expect(page.getByText('#1025')).toBeVisible();

        // Fill out the form
        await page.getByPlaceholder(/Enter name here/i).fill('John Wick');
        await page.locator('input[type="number"]').first().fill('5.5');

        // Click "+" button once to make loads = 2
        await page.getByTestId('increment-loads').click();

        // Fill Amount
        await page.getByPlaceholder('0.00').fill('350');

        // Submit the form
        await page.getByRole('button', { name: /Confirm Order/i }).click();

        // Verify Modal closes
        await expect(page.getByText('System Registry')).toBeHidden();

        // Verify Dashboard updated (based on your onSubmit logic)
        // Check if the history list now contains the new customer
        await expect(page.getByText('John Wick')).toBeVisible();

        // Check if StatsPulse count increased from 0 to 1
        await expect(page.getByText('1', { exact: true })).toBeVisible();
    });

    test('should raise an error when required fields are missing', async ({ page }) => {
        await page.goto('http://localhost:3000/');

        // Click "New Order" button in CommandCenter
        await page.getByRole('button', { name: /New Order/i }).click();

        // Verify Modal is open and shows the correct incremented ID (#1025)
        const modal = page.getByRole('dialog');
        await expect(page.getByText('#1025')).toBeVisible();

        // Submit the form
        await page.getByRole('button', { name: /Confirm Order/i }).click();

        // Verify Modal is still open  
        await expect(page.getByText('System Registry')).toBeVisible();

        // Check if StatsPulse count increased from 0 to 1
        await expect(page.getByText('0', { exact: true })).toBeVisible();
    });
});
