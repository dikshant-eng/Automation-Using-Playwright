const {test, expect} = require ('@playwright/test');

test('test', await ({page})=>{

await page.goto('https://standard.m.frappe.cloud/');

await page.close();



})