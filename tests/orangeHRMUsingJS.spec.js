const {test,expect} = require('@playwright/test');
require('dotenv').config();
const config=require('../configs/config.js')

const env = process.env.NODE_ENV || 'qa';
console.log("Env printing",env)
const baseURL=config.AUT_URL[env].URL;
console.log("Testing with base URL:",baseURL);



console.log(`Testing with base URL: ${env}`);

test('should open the base URL', async ({ page }) => {

    if (!baseURL) {
        throw new Error('BASE_URL is undefined');
    }
    await page.goto(baseURL); 
});



