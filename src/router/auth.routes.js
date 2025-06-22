import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const authRouter = Router()

dotenv.config()

// /api/auth/register
authRouter.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check(
      'password',
      'Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character'
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    check('firstName', 'First name must be at least 2 characters long').isLength({ min: 2 }),
    check('lastName', 'Last name must be at least 2 characters long').isLength({ min: 2 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data'
        })
      }
      const { email, password, firstName, lastName } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'This email has already been registered' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword, firstName, lastName })

      await user.save()

      res.status(201).json({ message: 'User created' })
    } catch (err) {
      res.status(500).json({ message: 'Registration error' })
    }
  }
)

// /api/auth/login
authRouter.post(
  '/login',
  [
    check('email', 'Invalid email').normalizeEmail().isEmail(),
    check('password', 'Invalid password').isLength({ min: 8 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data'
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Invalid data' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid data' })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.json({ token, userId: user.id })
    } catch (err) {
      res.status(500).json({ message: 'Login error' })
    }
  }
)
export default authRouter
