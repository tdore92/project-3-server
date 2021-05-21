import activityData from '../db/data/activities.js'


//request activities index
function index(req, res) {
  res.status(200).json(activityData)
}

//request single activity
function show(req, res) {
  const id = Number(req.params.id)

  const activity = activityData.find((activity) => {
    return activity.number === id
  })

  res.status(200).json(activity)
}

// create a new activity
function create(req, res) {
  const newActivity = req.body

  activityData.push(newActivity)

  res.status(201). json(newActivity)
}

export default {
  index,
  show,
  create,
}