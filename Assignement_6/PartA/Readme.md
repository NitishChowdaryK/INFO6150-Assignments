# Part A — Calculator with User Login

## Description
A two-page web application that includes a Northeastern email login page and an authenticated calculator page that performs basic arithmetic operations.

## Features Implemented
### Login Page
- Email + password validation using jQuery on keyup and blur
- Email must be valid and end with @northeastern.edu
- Password required and minimum 8 characters
- Login button disabled until both fields are valid
- Hardcoded user authentication
- Stores session using sessionStorage or localStorage (Remember Me)
- Success message with jQuery animation and automatic redirect

### Calculator Page
- Authentication guard (redirects to login if no session found)
- Shows welcome message with username extracted from email
- Validates both inputs as numeric values (supports negatives and decimals)
- Uses ONE arrow function to handle all operations (add/subtract/multiply/divide)
- Handles divide-by-zero edge case
- Logout clears storage and redirects with jQuery fade animation

## Technologies Used
- HTML5
- CSS3 (Flexbox, responsive layout)
- JavaScript (ES6+)
- jQuery

## How to Run
1. Open `login.html` in a browser.
2. Use one of the hardcoded users:
   - kush@northeastern.edu / Password123
   - test@northeastern.edu / Test12345
3. After login, you will be redirected to the calculator page.
