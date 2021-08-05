import mongoose from 'mongoose'
import { dbURL } from '../config/environment.js'

export default function connectToDb() {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  console.log(dbURL)

  return mongoose.connect(dbURL, options)
}