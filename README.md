# playwright-test-automation
This project is designed to automate UI and API testing using Playwright and TypeScript.

Task 1: Functional test scenario
Automate the UI tests for https://www.demoblaze.com/  
Test the “Sign In” flow and basic “Add to cart” functionality.

Task 2: API test scenario  
Write Automation tests for the below APIs (swagger -  https://petstore.swagger.io)  
● Add a new pet to the store  
● Find pet by ID

## Tech Stack
* Node.js
* Playwright
* TypeScript

## How to Run

### 1. Prerequisites
1. Install [Node.js] (https://nodejs.org/en) (v16 or later):
2. Install Git: To clone the repository


### 2. Clone the repository
    ```
    git clone https://github.com/bburhan123/playwright-test-automation.git
    ```

### 3. Install Dependencies
    ```
    npm install 
    ```

### 4. Install Playwright Browsers
By default the project will execute in Chrome browser.  
To run with other browers if required - Download the required browser binaries (Chromium, Firefox, and WebKit):  
    
    ```
    npx playwright install
    ```

### 5. Run Tests
* To run ui and api tests with default config (chrome - headless):
   ```
   npx playwright test
   ```

* To run ui and api tests with chrome head mode:
   ```
   npm run test:headed
   ```

* To run only ui tests with chrome headless mode:
   ```
   npm run test:ui
   ```

* To run only api tests:
   ```
   npm run test:api
   ```
