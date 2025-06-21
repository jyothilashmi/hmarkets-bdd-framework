

````markdown
# HMarkets BDD Framework

Automated test framework for [HMarkets](https://hmarkets.com) website using Selenium WebDriver with JavaScript and CucumberJS for BDD.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running Tests](#running-tests)  
- [Reporting](#reporting)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

This project is designed to automate form testing on the HMarkets website. It uses Selenium WebDriver and CucumberJS to simulate real user actions and validate form functionality such as the Contact Us form, Demo Account registration, and Live Account pre-registration forms.

---

## Features

- BDD-style test scenarios with CucumberJS  
- Page Object Model for scalable and maintainable test code  
- Supports functional, regression, and negative testing  
- Generates detailed test reports with Allure  
- Tests include validations, error handling, and successful submission checks  

---

## Prerequisites

- Node.js v18+  
- npm or yarn  
- Chrome browser (latest)  
- ChromeDriver compatible with your Chrome version  

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/jyothilashmi/hmarkets-bdd-framework.git
   cd hmarkets-bdd-framework
````

2. Install dependencies

   ```bash
   npm install
   ```

---

## Running Tests

* Run all tests:

  ```bash
  npm test
  ```

* Run tests tagged with `@smoke`:

  ```bash
  npm run test:regression
  ```

* Run specific feature file:

  ```bash
  npx cucumber-js features/contactUs.feature --tags "@smoke"
  ```

---

## Reporting

* Generate Allure report after test execution:

  ```bash
  npm run allure:generate
  ```

* Open Allure report in browser:

  ```bash
  npm run allure:open
  ```

---

## Project Structure

```
hmarkets-bdd-framework/
├── features/                 # Feature files (.feature)
├── features/step_definitions/ # Step definitions (.js) and  # Hooks 
├── pages/                    # Page Objects and Actions
├── utils/                    # Utility helpers and config files
├── allure-results/           # Allure raw results (generated)
├── allure-report/            # Allure report (generated)
├── cucumber.js               # Cucumber config
├── package.json
└── README.md
```


