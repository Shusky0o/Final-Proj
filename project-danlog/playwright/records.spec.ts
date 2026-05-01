import { test, expect, Page } from '@playwright/test';

async function mockRecordsData(page: Page) {
  // 1. Mock Pending (Alice)
  await page.route('**/orders/status-summary?status=pending', async (route) => {
    await route.fulfill({
      status: 200,
      json: { data: [{ id: 101, customer_name: 'Alice', status: 'pending' }] }
    });
  });

  // 2. Mock Ready (Bob)
  await page.route('**/orders/status-summary?status=ready', async (route) => {
    await route.fulfill({
      status: 200,
      json: { data: [{ id: 102, customer_name: 'Bob', status: 'ready' }] }
    });
  });

  // 3. IMPORTANT: Mock the Table Data (by-date)
  // The DailyLogTable displays what comes back from this specific call!
  await page.route('**/orders/by-date?**', async (route) => {
    await route.fulfill({
      status: 200,
      json: { 
        data: [
          { 
            id: 102, 
            customer_name: 'Bob', 
            status: 'Ready', 
            loads: 1, 
            created_at: new Date().toISOString() 
          }
        ] 
      }
    });
  });
}

test.describe('Records Page Management', () => {

  test('should move an order from Pending to Ready', async ({ page }) => {
    await mockRecordsData(page);
    await page.goto('http://localhost:3000/records');

    await expect(page.getByText('LOADING...')).toBeHidden({ timeout: 20000 });

    const bobRow = page.locator('tr', { hasText: 'Bob' });
    await expect(bobRow).toBeVisible();

    await bobRow.getByRole('button', { name: 'Delete Order' }).click();

    await expect(page.getByText(/Are you sure/i)).toBeVisible();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();

    await expect(page.locator('tr', { hasText: 'Bob' })).toHaveCount(0);

    await expect(page.getByText('LOADING...')).toBeHidden({ timeout: 15000 });

    // 1. Locate Alice's card in the Pending column
    const aliceCard = page.locator('div').filter({ hasText: 'Alice' }).first();
    
    // 2. Click "Set Ready"
    await aliceCard.getByRole('button', { name: 'Set Ready' }).click();

    // 3. Verify the button text changes to "Complete"
    // We use getByRole again to ensure a button exists with that specific text
    const completeButton = aliceCard.getByRole('button', { name: 'Complete' });
    await expect(completeButton).toBeVisible({timeout: 5000});
  });

  test('should delete an order through the DeleteModal', async ({ page }) => {
    await mockRecordsData(page);
    await page.goto('http://localhost:3000/records');

    await expect(page.getByText('LOADING...')).toBeHidden({ timeout: 20000 });

    const bobRow = page.locator('tr', { hasText: 'Bob' });
    await expect(bobRow).toBeVisible();

    await bobRow.getByRole('button', { name: 'Delete Order' }).click();

    await expect(page.getByText(/Are you sure/i)).toBeVisible();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();

    await expect(page.locator('tr', { hasText: 'Bob' })).toHaveCount(0);
  });
});