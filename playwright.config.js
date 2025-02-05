const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'blob' : 'html',                                                                                                                 
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
      
    timeout: 60*1000,
    expect:{
        timeout:5000
    },
    use:
    {
       trace:'on-first-retry',
       viewport:null,
       launchOptions: {
            args: ['--start-maximized'] // Start browser maximized
          },
        headless: false,
        launchOptions: { slowMo: 50 },
        screenshot: 'on',
        video:'on'
    },
    projects: [
        {
          name: 'chromium',
          use: { browserName: 'chromium',
            launchOptions: {
              args: ['--start-maximized'] // Start browser maximized
            },
          headless: false },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox',
            },
          },
          {
            name: 'webkit',
            use: { browserName: 'webkit',
             },
          }

        ],
        
    workers: 1, //By default all the test are run in parallel but we can limit the parallel run by keeping workers as 1
    globalSetup: require.resolve('./setup'),
    reporter: [['list'], ['json', { outputFile: 'results.json' }], ['html'], ['allure-playwright']],
    /*reporter: [
      [
        'allure-playwright',
        {
          outputFolder: 'allure-results',
          // Pass environment variables here
          environment: {
            'Browser': 'Chromium', // You can make it dynamic if needed
            'Version': process.env.PLAYWRIGHT_VERSION || '1.16', // Example: version of Playwright
            'OS': process.platform, // Operating System (e.g., win32, linux, darwin)
            'Environment': process.env.NODE_ENV
          },
        },
      ],
    ],*/
});

