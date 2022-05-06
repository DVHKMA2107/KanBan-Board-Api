import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { apiV1 } from '*/routes/v1'

connectDB()
  .then(() => console.log('Connected successfully to database sever'))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error)
    process.exit()
  })

const bootServer = () => {
  const app = express()

  app.use(express.json())

  app.use('/v1', apiV1)

  app.listen(env.PORT, env.HOST_NAME, () => {
    console.log(`Server is running at ${env.HOST_NAME}: ${env.PORT}/`)
  })
}
