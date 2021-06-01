import Activity from '../models/activities.js'
import { NotFound } from '../lib/errors.js'


async function create(req, res, next) {
  req.body.user = req.currentUser
  console.log(req.body)
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('user')
      .populate('comments.user')
    
    if (!activity) {
      throw new NotFound('No activity found.')
    }
    activity.comments.push(req.body)
    console.log(activity)
    const savedActivity = await activity.save()
    res.send(savedActivity)
  } catch (e) { 
    next(e)
  }
}




async function update(req, res, next) {
  try {
    const { activityId, commentId } = req.params

    const activity = await Activity.findById(activityId)

    if (!activity) {
      throw new NotFound('No activity found.')
    }

    const comment = activity.comments.id(commentId)

    if (!req.currentUser._id.equals(comment.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    comment.set(req.body)
    const savedActivity = await activity.save()

    res.send(savedActivity)

  } catch (e) {
    next(e)
  }

}


export default {
  create,
  update,
}