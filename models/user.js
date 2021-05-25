import mongoose from 'mongoose'

import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  location: { type: String },
  favSeason: { type: String },
  password: { type: String, required: true },
})

schema.pre('save', function encryptedPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

schema 
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
    // validation error.. invalidate and say whats wrong
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })

schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } }))
schema.plugin(uniqueValidator)

export default mongoose.model('User', schema)