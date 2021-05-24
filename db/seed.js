import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

import Activities from '../models/activities.js'
import activitiesData from './data/activities.js'

import User from '../models/user.js'
import userData from './data/user.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('Successfully connected to mongo !')

    await mongoose.connection.db.dropDatabase()
    console.log('Removed all the activities !')

    const users = await User.create(userData)
    console.log(`${users.length} user(s) created !`)
    console.log(users)

    const activitiesDataWithUsers = activitiesData.map(activity => {
      return { ...activity, user: users[1]._id }
    })
    console.log(activitiesDataWithUsers)

    const activities = await Activities.create(activitiesDataWithUsers)
    console.log(`${activities.length} activities created !`)

    const myComment = {
      text: 'This is my first comment',
      user: users[0]._id,
    }

    const activityToCommentOn = activities[0]
    activityToCommentOn.comments.push(myComment)

    const savedActivity = await activityToCommentOn.save()
    console.log(savedActivity)

    await mongoose.connection.close()
    console.log('Disconnected from mongo. All done !')
    
  } catch (err) {
    console.log('Something went wrong :(')
    await mongoose.connection.close()
  }
}

seedDatabase()