const express = require('express')
const router = express.Router()

const upload = require('../middleware/upload')

const {
  validateCreateUser,
  validateEditUser,
  validateLogin,
} = require('../middleware/validate')

const {
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  uploadImage,
  loginUser,
} = require('../controllers/userController')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nitish Chowdary
 *               email:
 *                 type: string
 *                 example: nitish@gmail.com
 *               password:
 *                 type: string
 *                 example: Strong@123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation failed
 */
router.post('/create', validateCreateUser, createUser)

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user full name or password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: nitish@gmail.com
 *               fullName:
 *                 type: string
 *                 example: Nitish Kumar
 *               password:
 *                 type: string
 *                 example: NewPass@123
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: User not found
 */
router.put('/edit', validateEditUser, editUser)

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user by email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: nitish@gmail.com
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/delete', deleteUser)

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/getAll', getAllUsers)

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload image for a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - image
 *             properties:
 *               email:
 *                 type: string
 *                 example: nitish@gmail.com
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file format or image already exists
 *       404:
 *         description: User not found
 */
router.post('/uploadImage', upload.single('image'), uploadImage)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate user with email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: nitish@gmail.com
 *               password:
 *                 type: string
 *                 example: Strong@123
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Authentication failed
 */
router.post('/login', validateLogin, loginUser)

module.exports = router
