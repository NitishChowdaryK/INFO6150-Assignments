# Assignment 8 - Secure RESTful APIs

## Objective
This project implements secure RESTful APIs using Node.js, Express, and MongoDB for managing users, authentication, and image uploads.

## Features
- Create user
- Edit user
- Delete user
- Get all users
- Upload image
- Authenticate user with email and password
- Password hashing with bcrypt
- Input validation
- Swagger API documentation
- Postman-tested endpoints

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- multer
- validator
- Swagger

## Project Structure
- config/
- controllers/
- middleware/
- models/
- routes/
- swagger/
- images/

## API Endpoints
- POST /user/create
- PUT /user/edit
- DELETE /user/delete
- GET /user/getAll
- POST /user/uploadImage
- POST /user/login

## How to Run
1. Install dependencies:
   npm install

2. Add `.env` file:
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/assignment8db

3. Start the server:
   npm run dev

## Swagger Docs
Open:
http://localhost:3000/api-docs

## Postman Testing
An exported Postman collection is included in the project folder for testing all endpoints.

## Notes
- Passwords are stored in hashed format using bcrypt.
- Only JPEG, PNG, and GIF image formats are allowed.
- Each user can upload only one image.