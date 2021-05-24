import express from 'express'
import router from './views/router.js'

import logger from './middleware/errorHandler.js'
import errorHandler from './middleware/logger.js'

const app = express()

app.use(express.json())
app.use(logger)
app.use('/api', router)
app.use(errorHandler)

export default app

