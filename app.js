import express from 'express'
import router from './views/router.js'

const app = express()

app.use(express.json())
<<<<<<< HEAD

=======
>>>>>>> drew-feature
app.use('/api', router)

export default app

