import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'

export default function secureRoute(req, res, next) {

  //check the token
  const rawToken = req.headers.authorization
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized 1' })
  }
  const token = rawToken.replace('Bearer ', '')
  console.log(token)

  //verify the token
  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized 2' })
    }

    //get the user, stick them on the request
    const user = await User.findById(payload.sub)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized 3' })
    }

    req.currentUser = user
    next()
  })
}