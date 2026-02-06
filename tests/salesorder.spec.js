import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://standard.m.frappe.cloud/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('dikshant@korecent.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Korecent@01');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Search Ctrl+K' }).click();
  await page.getByRole('combobox', { name: 'Search or type a command' }).click();
  await page.getByRole('combobox', { name: 'Search or type a command' }).fill('Sales Order');
  await page.getByRole('combobox', { name: 'Search or type a command' }).press('Enter');

  //Sales order page opened -->
  await page.goto('https://standard.m.frappe.cloud/login?redirect-to=%2Fdesk%2Fsales-order');
  await page.getByRole('button', { name: 'Add Sales Order' }).click();

  //Mandatory Fields Validation --->
  await page.locator('form').filter({ hasText: 'Series SAL-ORD-.YYYY.- SAL-' }).locator('input[type="text"]').click();
  await page.getByText('West View Software Ltd., Demo').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('.btn.btn-modal-close').click();

  //Creating a Sales order --->

//   Set Delivery date ---->
  await page.getByRole('textbox').nth(1).click();
  await page.locator('.datepicker.-bottom-left-.-from-bottom-.active > .datepicker--nav > div:nth-child(3) > svg').click();
  await page.getByText('3', { exact: true }).nth(2).click();

// Add Row to the Item table and add Items -->
  await page.locator('.col.grid-static-col.col-xs-3.error').click();
  await page.getByRole('combobox', { name: 'Item Code' }).click();
  await page.getByText('Disposable Paper Cups,').click();
  await page.getByRole('textbox', { name: 'Quantity' }).click();
  await page.getByRole('textbox', { name: 'Quantity' }).fill('50');
  await page.getByRole('textbox', { name: 'Rate (INR)' }).click();
  await page.getByRole('textbox', { name: 'Rate (INR)' }).fill('23.36');

// Click the Pencil icon on the Item table ad open the form view ---->  
  await page.locator('.btn-open-row > a').click();
  await page.locator('div:nth-child(2) > .section-head > .collapse-indicator > .icon > .mb-1').first().click();
  await page.getByRole('paragraph').nth(2).click();
  await page.locator('.ql-editor').first().fill('Paper cups Disposable');
  await page.locator('.collapse-indicator > .es-icon').first().click();
  await page.locator('div:nth-child(11) > .section-body > div > form > div > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback').first().click();
  await page.getByText('Stores - KDActual Qty :').click();

// Close the Form ----->  
  await page.locator('.btn.btn-secondary.btn-sm.pull-right').first().click();

// Sales Tax and Charges Table ---->

  await page.getByRole('button', { name: 'Add row' }).nth(1).click();
  await page.locator('.col.grid-static-col.col-xs-2.error').first().click();
  await page.locator('.input-with-feedback.form-control.ellipsis.bold.input-sm').selectOption('Actual');
  await page.getByRole('combobox', { name: 'Account Head' }).click();
  await page.getByText('- Freight and Forwarding Charges - KD5200 - Indirect Expenses - KD').click();
  await page.getByRole('textbox', { name: 'Amount', exact: true }).click();
  await page.getByRole('textbox', { name: 'Amount', exact: true }).fill('25.36');

// click Pencil Icon and Expands the Form --->   
  await page.locator('div:nth-child(9) > .btn-open-row > a').click();
//Close the Form view ----->  
  await page.locator('.grid-row.grid-row-open > .form-in-grid > .grid-form-heading > .toolbar > .row-actions > .btn.btn-secondary.btn-sm.pull-right.grid-collapse-row').click();



//Navigate to the Address and Contact Tab ----->
await page.getByRole('tab', { name: 'Address & Contact' }).click();
const contactPerson = page.locator('input[data-fieldname="contact_person"]' );
await contactPerson.click(); 

await page.getByText('john wizjohn wiz-West View').click();

// Navigate to the Terms Tab ------> 
await page.getByRole('tab', { name: 'Terms' }).click();
const paymenttermteplate = page.locator('input[data-fieldname="payment_terms_template"]' );
await paymenttermteplate.click(); 

await page.getByText('NET 30').click();
 
// Save the Sales Order Document ----->
await page.getByRole('button', { name: 'Save' }).click();




// Explicit wait for 5 Sec to save the form ---->  


await page.waitForTimeout(8000); // waits 5 seconds



})



