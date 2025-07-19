# mobileap# Product Management Application

## Overview
The Product Management Application is a mobile app designed to help users manage products effectively. It includes features for user registration, login, product display, and management.

## Features
1. **User Registration**: Users can register by providing their full name, email, password, and confirming their password. Input validation is included.
2. **User Login**: Registered users can log in using their email and password. Successful login navigates to the product list screen.
3. **Display Product List**: A list of products is displayed with their name, description, price, and image (if available).
4. **Product Management (CRUD)**: Users can add, view, update, and delete products.
5. **Search Products**: Users can search for products by name with real-time results.
6. **Sort Products**: Users can sort the product list by price in ascending or descending order.

## Technical Requirements
- **Storage Options**: Users can choose to use a mock API (e.g., JSON Server) for data storage.
- **State Management**: The app utilizes state management tools such as useState, useReducer, or Redux.
- **Component Organization**: The code is organized into clear components for forms, lists, detail screens, etc.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd product-management-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## License
This project is licensed under the MIT License.