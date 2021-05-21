import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
  number: { type: Number, required: true },
  country: { type: String, required: true },
  activity: { type: String, required: true },
  season: { type: String, required: true },
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
})

export default mongoose.model('Activities', activitySchema)