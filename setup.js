const fs = require('fs');
const path = require('path');
const appConfig = require('./configs/config');

const env = process.env.NODE_ENV || 'qa';
console.log("🔹 Environment:", env);

if (!appConfig.AUT_URL[env]) {
    console.error(`❌ ERROR: Invalid environment '${env}' in config. Check your NODE_ENV variable.`);
    process.exit(1); 
}

async function globalSetup(config) {
    const allureResultsPath = 'allure-results';
    console.log("🔹 Global setup running...");
    
    const baseURL = appConfig.AUT_URL[env].URL;
    const envVars = `BROWSER=${config.projects[0].name}\nBASE_URL=${baseURL}\nTEST_ENV=${env}`;

    console.log(`🔹 Writing Environment Variables:\n${envVars}`);

    // if (!fs.existsSync(allureResultsPath)) {
    //     fs.mkdirSync(allureResultsPath, { recursive: true });
    // }
    // fs.writeFileSync(path.join(allureResultsPath, 'environment.properties'), envVars);
}

module.exports = globalSetup;
