import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //login
  await page.goto('https://standard.m.frappe.cloud/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('ramandeep@korecent.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Korecent@01');
  await page.getByRole('button', { name: 'Login' }).click();

//Go to Desk and click manufacturing
  await page.locator('.desktop-container').click();
  await page.getByRole('link', { name: 'Manufacturing' }).click();
  await page.keyboard.press('Control+k');

// Wait for search input inside modal
  const searchBox = page.getByRole('combobox', { name: 'Search or type a command' });
  await expect(searchBox).toBeVisible({ timeout: 10000 });

// Type and select
  await searchBox.fill('Item Attribute List');
  await searchBox.press('Enter');

//add item attribute
  await page.getByRole('button', { name: 'Add Item Attribute' }).click();

//Check for mandatory fields
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('.modal-dialog.msgprint-dialog > .modal-content > .modal-header > .modal-actions > .btn.btn-modal-close').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('SD0076');
  await page.getByText('Delete Delete all Duplicate rows Add row Add multiple Download Upload').click();
  await page.getByRole('button', { name: 'Add row' }).click();
  await page.getByRole('textbox', { name: 'Attribute Value' }).click();
  await page.getByRole('textbox', { name: 'Attribute Value' }).fill('123');
  await page.getByRole('textbox', { name: 'Abbreviation' }).click();
  await page.getByRole('textbox', { name: 'Abbreviation' }).fill('ABC');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('.form-section > .section-body > div:nth-child(2)').first().click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

// Enable numeric values
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('button', { name: 'Add Item Attribute' }).click();
  await page.locator('[data-fieldname="attribute_name"] input').fill('ABC');
  await page.getByRole('checkbox', { name: 'Numeric Values' }).check();

// Fill numeric fields using labels
  await page.locator('[data-fieldname="from_range"] input').fill('334.6');
  await page.locator('[data-fieldname="increment"] input').fill('9');
  await page.locator('[data-fieldname="to_range"] input').fill('335.8');
  await page.getByRole('button', { name: 'Save' }).click();

//Disable Item attribute
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('link', { name: 'SD0067' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute/ABC');
  await page.getByRole('checkbox', { name: 'Disabled' }).check();
  await page.locator('div:nth-child(2) > form > .form-group > .checkbox').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
});