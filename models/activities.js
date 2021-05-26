import mongoose from 'mongoose'

//embedded schema
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const activitySchema = new mongoose.Schema({
  number: { type: Number, required: true },
  country: { type: String, required: true },
  season: { type: String, required: true },
  activityName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  categories: {
    type: [String],
    required: true,
    validate: [
      { validator: (categories) => categories.length > 0, msg: 'You must have at least one category.' }
    ],
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
})

export default mongoose.model('Activities', activitySchema)