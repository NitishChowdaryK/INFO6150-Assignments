const validator = require('validator')

const isValidFullName = (fullName) => {
  return /^[A-Za-z\s]+$/.test(fullName.trim())
}

const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password)
}

const validateCreateUser = (req, res, next) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Full name, email, and password are required.',
    })
  }

  if (!isValidFullName(fullName)) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Full name must contain only alphabetic characters and spaces.',
    })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Invalid email format.',
    })
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Validation failed.',
      details:
        'Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.',
    })
  }

  next()
}

const validateEditUser = (req, res, next) => {
  const { email, fullName, password } = req.body

  if (!email) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Email is required to identify the user.',
    })
  }

  if (fullName !== undefined && !isValidFullName(fullName)) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Full name must contain only alphabetic characters and spaces.',
    })
  }

  if (password !== undefined && !isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Validation failed.',
      details:
        'Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.',
    })
  }

  next()
}

const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Email and password are required.',
    })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: 'Validation failed.',
      details: 'Invalid email format.',
    })
  }

  next()
}

module.exports = {
  validateCreateUser,
  validateEditUser,
  validateLogin,
}
