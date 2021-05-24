import Activities from '../models/activities.js'

import { NotFound } from '../lib/errors.js'

//request activities index
async function index(req, res, next) {
  try {
<<<<<<< HEAD
    const activitiesList = await Activities.find().populate('user')
=======
    const activitiesList = await Activities.find().lean()
    
    res.status(200).json(activitiesList)
  } catch (e) {
    next(e)
  }
}

async function search(req, res, next) {
  try {
    const searchParams = req.query
    console.log(searchParams)

    const activitiesList = await Activities.find(searchParams)

>>>>>>> development
    res.status(200).json(activitiesList)
  } catch (e) {
    next(e)
  }
}

//request single activity
async function show(req, res, next) {
  try {
    const id = req.params.id
    const activities = await (await Activities.findById(id)).populate('user')

    if (!activities) {
      throw new NotFound('No activity found !')
    }
    
    res.status(200).json(activities)
  } catch (e) {
    next(e)
  }
}

// create a new activity
async function create(req, res, next) {
<<<<<<< HEAD
  req.body.user = req.currentUser
  
=======
>>>>>>> development
  try {
    const newActivity = await Activities.create(req.body)

    res.status(201).json(newActivity)
<<<<<<< HEAD
  } catch (e){
=======
  } catch (e) {
>>>>>>> development
    next(e)
  }
}

//remove an activity
async function remove(req, res, next) {
  try {
<<<<<<< HEAD
    const currentUserId = req.currentUser._id
    const activity = await Activities.findById(req.params.id)

    if (!activity) {
      throw new NotFound('No acrtivity found.')
    }

    if (!currentUserId.equals(activity.user)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await activity.deleteOne()

    res.sendStatus(204)

  } catch (e) {
    next(e)
  }
  
=======
    await Activities.findByIdAndRemove(req.params.id)

    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
>>>>>>> development
}

// update an activity
async function update(req, res, next) {
  try {
<<<<<<< HEAD
    const currentUserid = req.currentUser._id
    const activity = await activity.findById(req.params.id)

    if (!activity) {
      throw new NotFound('No activity found.')
    }

    if (!currentUserid.equals(activity.user)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    activity.set(req.body)
    activity.save()

    res.status(202).json(activity)

=======
    const id = req.params.id
    const body = req.body
  
    const updatedActivity = await Activities.findOneAndUpdate({ _id: id }, body, { new: true })
  
    res.status(202).json(updatedActivity)
>>>>>>> development
  } catch (e) {
    next(e)
  }
}

export default {
  index,
  show,
  create,
  remove,
  update,
  search,
}