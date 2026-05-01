import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard API Mocking', () => {
  
  test.beforeEach(async ({ page }) => {
    // 1. Mock the main orders list (res)
    await page.route('**/orders?limit=20', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            { id: 1, customer_name: 'John Doe', amount: 500, created_at: new Date().toISOString() },
            { id: 2, customer_name: 'Jane Smith', amount: 1200, created_at: new Date().toISOString() }
          ],
          nextCursor: { id: 2, created_at: new Date().toISOString() },
          hasMore: true
        }),
      });
    });

    // 2. Mock pending count summary (res2)
    await page.route('**/orders/status-summary?status=pending', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ count: 5 }),
      });
    });

    // 3. Mock yearly/monthly revenue (res3)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    await page.route(`**/orders/total/year?year=${currentYear}`, async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          monthly: [
            { month: currentMonth, total: 25000.50 }
          ]
        }),
      });
    });

    // 4. Mock today's total revenue (res4)
    await page.route('**/orders/today-total', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ total: 1500.75 }),
      });
    });

    // Go to the dashboard after routes are defined
    await page.goto('http://localhost:3000/');
  });

  test('should display mocked data in the StatsPulse component', async ({ page }) => {
    // Verify Pending Count (Mocked to 5)
    await expect(page.getByText('5', { exact: true })).toBeVisible();

    // Verify Monthly Revenue (Mocked to 25,000.50)
    // Note: The UI likely uses .toLocaleString(), so check for the formatted string
    await expect(page.getByText('25,000.50')).toBeVisible();

    // Verify Today's Revenue (Mocked to 1,500.75)
    await expect(page.getByText('1,500.75')).toBeVisible();
  });

  test('should display mocked customer history items', async ({ page }) => {
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
  });
});