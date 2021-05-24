import express from 'express'
import activityController from '../controllers/activities.js'
import userController from '../controllers/user.js'
import commentController from '../controllers/comment.js'

import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.route('/activities')
  .get(activityController.index)
  .post(secureRoute, activityController.create)

router.route('/activities/search')
  .get(activityController.search)

router.route('/activities/:id')
  .get(activityController.show)
  .delete(secureRoute, activityController.remove)
  .put(secureRoute, activityController.update)

router.route('/activities/:id/comment')
  .post(secureRoute, commentController.create)

router.route('/activities/:activityId/comment/:commentId')
  .put(secureRoute, commentController.update)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router