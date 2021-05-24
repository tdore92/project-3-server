import User from '../models/user.js'
import { NotValid } from '../lib/errors.js'

async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

export default {
  register,
}