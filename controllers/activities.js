import Activities from '../models/activities.js'

import { NotFound } from '../lib/errors.js'

//request activities index
async function index(req, res) {
  const activitiesList = await Activities.find().lean()

  res.status(200).json(activitiesList)
}

//request single activity
async function show(req, res, next) {
  try {
    const id = req.params.id
    const activities = await Activities.findById(id)

    if (!activities) {
      throw new NotFound('No activity found !')
    }
    
    res.status(200).json(activities)
  } catch (err) {
    next(err)
  }
}

// create a new activity
async function create(req, res) {
  const newActivity = await Activities.create(req.body)

  res.status(201).json(newActivity)
}

//remove an activity
async function remove(req, res) {
  await Activities.findByIdAndRemove(req.params.id)

  res.sendStatus(204)
}

// update an activity
async function update(req, res) {
  const id = req.params.id
  const body = req.body

  const updatedActivity = await Activities.findOneAndUpdate({ _id: id }, body, { new: true })

  res.status(202).json(updatedActivity)
}

export default {
  index,
  show,
  create,
  remove,
  update,
}