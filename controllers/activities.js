import activitiesData from '../db/data/activities.js'


//request activities index
function index(req, res) {
  res.status(200).json(activitiesData)
}

//request single activity
function show(req, res) {
  const id = Number(req.params.id)

  const activity = activitiesData.find((activity) => {
    return activity.number === id
  })

  res.status(200).json(activity)
}

// create a new activity
function create(req, res) {
  const newActivity = req.body

  activitiesData.push(newActivity)

  res.status(201). json(newActivity)
}

export default {
  index,
  show,
  create,
}