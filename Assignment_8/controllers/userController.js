const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const SALT_ROUNDS = 10

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, type } = req.body

    if (!fullName || !email || !password || !type) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Full name, email, password, and type are required.',
      })
    }

    if (!['admin', 'employee'].includes(type)) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Type must be either admin or employee.',
      })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'A user with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      type,
    })

    await user.save()

    return res.status(201).json({
      message: 'User created successfully.',
      user: {
        fullName: user.fullName,
        email: user.email,
        type: user.type,
        imagePath: user.imagePath,
      },
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

const editUser = async (req, res) => {
  try {
    const { email, fullName, password, type } = req.body

    if (!email) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Email is required.',
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json({
        error: 'User not found.',
      })
    }

    if (fullName !== undefined) {
      user.fullName = fullName.trim()
    }

    if (password !== undefined) {
      user.password = await bcrypt.hash(password, SALT_ROUNDS)
    }

    if (type !== undefined) {
      if (!['admin', 'employee'].includes(type)) {
        return res.status(400).json({
          error: 'Validation failed.',
          details: 'Type must be either admin or employee.',
        })
      }
      user.type = type
    }

    await user.save()

    return res.status(200).json({
      message: 'User updated successfully.',
      user: {
        fullName: user.fullName,
        email: user.email,
        type: user.type,
        imagePath: user.imagePath,
      },
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Email is required.',
      })
    }

    const deletedUser = await User.findOneAndDelete({
      email: email.toLowerCase(),
    })

    if (!deletedUser) {
      return res.status(404).json({
        error: 'User not found.',
      })
    }

    return res.status(200).json({
      message: 'User deleted successfully.',
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { fullName: 1, email: 1, type: 1, imagePath: 1, _id: 0 },
    )

    return res.status(200).json({
      users,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

const uploadImage = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Email is required.',
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json({
        error: 'User not found.',
      })
    }

    if (user.imagePath) {
      return res.status(400).json({
        error: 'Image already exists for this user.',
      })
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Image file is required.',
      })
    }

    user.imagePath = `/images/${req.file.filename}`
    await user.save()

    return res.status(201).json({
      message: 'Image uploaded successfully.',
      filePath: user.imagePath,
    })
  } catch (error) {
    if (error.message.includes('Invalid file format')) {
      return res.status(400).json({
        error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.',
      })
    }

    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation failed.',
        details: 'Email and password are required.',
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed.',
        details: 'Invalid email or password.',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        error: 'Authentication failed.',
        details: 'Invalid email or password.',
      })
    }

    return res.status(200).json({
      message: 'Authentication successful.',
      user: {
        fullName: user.fullName,
        email: user.email,
        type: user.type,
        imagePath: user.imagePath,
      },
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server error.',
      details: error.message,
    })
  }
}

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  uploadImage,
  loginUser,
}