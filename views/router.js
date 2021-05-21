import express from 'express'
import activityController from '../controllers/activities.js'

const router = express.Router()

router.route('/activities')

  .get(activityController.index)
  .post(activityController.create)

router.route('/activity/:id')
  .get(activityController.show)
  .delete(() => console.log('TODO: remove'))
  .put(() => console.log('TODO: update'))

export default router