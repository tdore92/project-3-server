import Activities from '../models/activities.js'

import { NotFound } from '../lib/errors.js'

//request activities index
async function index(req, res, next) {
  try {
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

    res.status(200).json(activitiesList)
  } catch (e) {
    next(e)
  }
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
async function create(req, res, next) {
  try {
    const newActivity = await Activities.create(req.body)

    res.status(201).json(newActivity)
  } catch (e) {
    next(e)
  }
}

//remove an activity
async function remove(req, res, next) {
  try {
    await Activities.findByIdAndRemove(req.params.id)

    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
}

// update an activity
async function update(req, res, next) {
  try {
    const id = req.params.id
    const body = req.body
  
    const updatedActivity = await Activities.findOneAndUpdate({ _id: id }, body, { new: true })
  
    res.status(202).json(updatedActivity)
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