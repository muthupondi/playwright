const { request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const payloadFileName="payloads.json"

/**
 * Utility function to make a GET request.
 * @param {string} url - The URL for the GET request.
 * @param {object} [params={}] - Optional query parameters for the GET request.
 * @returns {object} - The response object.
 */
async function makeGetRequest(url, params = {}) {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Add query parameters if any
  const queryParams = new URLSearchParams(params).toString();
  const requestUrl = queryParams ? `${url}?${queryParams}` : url;

  // Make GET request
  const response = await apiContext.get(requestUrl);

  // Return the response object
  return response;
}

/**
 * Utility function to make a POST request.
 * @param {string} url - The URL for the POST request.
 * @param {object} data - The payload data for the POST request.
 * @returns {object} - The response object.
 */
async function makePostRequest(url, data) {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Make POST request
  const response = await apiContext.post(url, {
    data: data
  });

  // Return the response object
  return response;
}

/**
 * Utility function to load payloads from a JSON file.
 * @param {string} payloadFileName - The name of the JSON file (relative to this file).
 * @returns {object} - The parsed JSON object.
 */
function loadPayload() {
  const filePath = path.resolve(__dirname, payloadFileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

module.exports = {
  makeGetRequest,
  makePostRequest,
  loadPayload
};
