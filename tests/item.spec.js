import { test, expect } from '@playwright/test';

test('Create Item Attribute in Frappe', async ({ page }) => {
  test.setTimeout(120000);

  // ---------------- LOGIN ----------------
  await page.goto('https://standard.m.frappe.cloud/login');

  await page.locator('#login_email').fill('ramandeep@korecent.com');
  await page.locator('#login_password').fill('Korecent@01');
  await page.locator('button:has-text("Login")').click();

  // Wait for desk to load fully
  await expect(page.locator('.navbar')).toBeVisible({ timeout: 60000 });

  // ---------------- OPEN AWESOME SEARCH (FIXED) ----------------
  await page.keyboard.press('Control+k');

  const searchBox = page.getByRole('combobox', { name: 'Search or type a command' });
  await expect(searchBox).toBeVisible({ timeout: 10000 });

  await searchBox.fill('Item Attribute List');
  await page.getByRole('link', { name: 'Item Attribute List' }).click();

  // Wait for list view
  await expect(page.locator('.list-view-container')).toBeVisible({ timeout: 60000 });

  // ---------------- ADD ITEM ATTRIBUTE ----------------
  await page.click('button:has-text("Add Item Attribute")');

  await expect(page.locator('input[data-fieldname="attribute_name"]')).toBeVisible({ timeout: 30000 });

  await page.fill('input[data-fieldname="attribute_name"]', 'SD0034');

  // Add child table row
  await page.click('button.grid-add-row');

  await page.fill('input[data-fieldname="attribute_value"]', '123');
  await page.fill('input[data-fieldname="abbr"]', 'ABC');

  // Save
  await page.click('button:has-text("Save")');

  // Wait for save confirmation
  await expect(page.locator('.indicator.green')).toBeVisible({ timeout: 20000 });

  // ---------------- VERIFY RECORD EXISTS ----------------
  await page.goto('https://standard.m.frappe.cloud/app/item-attribute');
  await expect(page.getByRole('link', { name: 'SD0034' })).toBeVisible({ timeout: 20000 });
});
