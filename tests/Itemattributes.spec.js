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
  await page.getByRole('textbox').fill('SD0085');
  await page.getByText('Delete Delete all Duplicate rows Add row Add multiple Download Upload').click();
  await page.getByRole('button', { name: 'Add row' }).click();
  await page.getByRole('textbox', { name: 'Attribute Value' }).click();
  await page.getByRole('textbox', { name: 'Attribute Value' }).fill('12460433');
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
  await page.waitForSelector('.list-row');                    
  await page.locator('.list-row').filter({ hasText: 'SD0049' }).first().click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute/ABC');
  await page.getByRole('checkbox', { name: 'Disabled' }).check();
  await page.locator('div:nth-child(2) > form > .form-group > .checkbox').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute/view/list');
  await page.locator('#navbar-modal-search').getByText('Search Ctrl+K').click();
  await page.getByRole('combobox', { name: 'Search or type a command' }).fill('item');
  await page.getByRole('combobox', { name: 'Search or type a command' }).click();
  await page.getByRole('link', { name: 'Item List', exact: true }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item?disabled=0');
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByRole('button', { name: 'Edit Full Form' }).click();
  await page.getByRole('checkbox', { name: 'Has Variants' }).check();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('1114');
  await page.getByRole('combobox').first().click();
  await page.getByText('ConsumableAll Item Groups').click();
  await page.getByRole('tab', { name: 'Variants' }).click();
  await page.getByRole('button', { name: 'Add row' }).click();
  await page.getByLabel('Variants', { exact: true }).getByText('SD0070').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.keyboard.press('Control+k');
  const commandBox = page.getByRole('combobox', { name: 'Search or type a command' });
  await expect(commandBox).toBeVisible();
  await commandBox.fill('Item Attribute List');
  await commandBox.press('Enter');
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('link', { name: 'SD0049', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Disabled' }).uncheck();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.locator('#navbar-modal-search').getByText('Search Ctrl+K').click();
  await page.getByRole('link', { name: 'Item List' }).first().click();
  await page.goto('https://standard.m.frappe.cloud/desk/item?disabled=0');
  await page.getByRole('button', { name: 'Add Item' }).click();
  const editFullFormBtn = page.getByRole('button', { name: 'Edit Full Form' });
  await expect(editFullFormBtn).toBeVisible({ timeout: 10000 });
  await editFullFormBtn.click();
  await page.getByRole('checkbox', { name: 'Has Variants' }).check();
  await page.getByRole('tab', { name: 'Variants' }).click();
  await page.getByRole('button', { name: 'Add row' }).click();
  await page.getByRole('combobox', { name: 'Attribute' }).click();
  await page.getByRole('combobox', { name: 'Attribute' }).fill('sd0047');
  await page.getByLabel('Variants', { exact: true }).getByTitle('SD0047', { exact: true }).click();

//Duplicate item attribute
  await page.getByText('Search Ctrl+K').click();
  const searchtab = page.getByRole('combobox', { name: 'Search or type a command' });
  await expect(searchtab).toBeVisible({ timeout: 10000 });
  await searchtab.fill('Item Attribute List');
  await searchtab.press('Enter');
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('button', { name: 'Add Item Attribute' }).click();
  await page.getByRole('textbox').fill('SD0051');
  await page.getByRole('button', { name: 'Add row' }).click();
  await page.locator('.col.grid-static-col.col-xs-5.error').first().click();
  const attributeName = page.locator('[data-fieldname="attribute_name"] input');
  await expect(attributeName).toBeVisible();
  await expect(attributeName).toBeEditable();
  await attributeName.fill('SD0011');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('textbox', { name: 'Abbreviation' }).click();
  await page.getByRole('textbox', { name: 'Abbreviation' }).fill('CVBN');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('.modal-dialog.msgprint-dialog > .modal-content > .modal-header > .modal-actions > .btn.btn-modal-close').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('SD0086');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();

  //Rename item attribute
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('link', { name: 'SD0051' }).click();
  //Menu button
  const menuButton = page.locator(
  "//div[@id='page-Item Attribute']//button[contains(@class,'menu-more-button')]");
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await page.getByRole('link', { name: 'Rename' }).click();
  await page.getByRole('textbox').fill('SD00105');
  await page.getByRole('button', { name: 'Rename' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute/SD00105');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute/SD00105');
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');

//Delete item attribute
  await page.getByRole('checkbox').nth(1).check();
  //Action button
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('link', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('.modal-dialog.msgprint-dialog > .modal-content > .modal-header > .modal-actions > .btn.btn-modal-close').click();
  await page.getByRole('link', { name: 'SD0045' }).click();
  //Menu button
  const menudropdown = page.locator(
  "//div[@id='page-Item Attribute']//button[contains(@class,'menu-more-button')]");
  await expect(menudropdown).toBeVisible();
  await menudropdown.click();
  await page.getByRole('link', { name: 'Delete ⇧+Ctrl+D' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  
  //Bulk update numeric  value
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('link', { name: 'SD0060' }).click();
  await page.getByRole('checkbox', { name: 'Numeric Values' }).check();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('.modal-dialog.msgprint-dialog > .modal-content > .modal-header > .modal-actions > .btn.btn-modal-close').click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('1');
  await page.locator('form').filter({ hasText: 'To Range 0 to_range' }).getByRole('textbox').dblclick();
  await page.locator('form').filter({ hasText: 'To Range 0 to_range' }).getByRole('textbox').fill('12');
  await page.locator('form').filter({ hasText: 'To Range 0 to_range' }).getByRole('textbox').click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('2');
  await page.getByRole('button', { name: 'Save' }).click();
  //await page.getByRole('button', { name: 'Save' }).click();
  //await page.goto('https://standard.m.frappe.cloud/desk/item-attribute/SD002');
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  //await page.getByRole('link', { name: 'SD002' }).click();
  //await page.getByRole('link', { name: '/ Item Attribute' }).click();
  //await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('link', { name: 'SD0061' }).click();
  await page.getByRole('checkbox', { name: 'Numeric Values' }).check();
  await page.getByRole('textbox').first().dblclick();
  await page.getByRole('textbox').first().fill('12');
  await page.locator('form').filter({ hasText: 'To Range 0 to_range' }).getByRole('textbox').dblclick();
  await page.locator('form').filter({ hasText: 'To Range 0 to_range' }).getByRole('textbox').fill('15');
  await page.getByRole('textbox').nth(1).dblclick();
  await page.getByRole('textbox').nth(1).fill('3');
  await page.getByRole('button', { name: 'Save' }).click();
  //await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('checkbox').nth(2).check();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('combobox').selectOption('Numeric Values (Item Attribute)');
  await page.getByRole('button', { name: 'Update 1 records' }).click();
  await page.getByRole('link', { name: 'SD0061' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.goto('https://standard.m.frappe.cloud/desk/item-attribute');
  await page.getByRole('link', { name: 'SD0060' }).click();
  await page.getByRole('link', { name: '/ Item Attribute' }).click();
  await page.close();


});