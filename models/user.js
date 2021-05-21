import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  location: { type: String },
  favSeason: { type: String },
  password: { type: String, required: true },
  passwordConfirmation: { type: String, required: true },
})

export default mongoose.model('User', userSchema)