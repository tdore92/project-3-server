import express from 'express'
import activityController from '../controllers/activities.js'

const router = express.Router()

router.route('/activities')
  .get(activityController.index)
  .post(activityController.create)

router.route('/activities/:id')
  .get(activityController.show)
  .delete(activityController.remove)
  .put(activityController.update)

export default router