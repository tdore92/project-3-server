import express from 'express'
import activityController from '../controllers/activities.js'
import userController from '../controllers/user.js'

import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.route('/activities')
  .get(activityController.index)
  .post(secureRoute, activityController.create)

router.route('/activities/:id')
  .get(activityController.show)
  .delete(secureRoute, activityController.remove)
  .put(secureRoute, activityController.update)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router