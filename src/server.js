import express from 'express'
import cors from 'cors'
import { connectDB } from '*/config/mongodb'
import { corsOptions } from '*/config/cors'
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

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', apiV1)

  //Support heroku deploy
  app.listen(process.env.PORT || env.APP_PORT, () => {
    console.log(
      `Server is running at port: ${process.env.PORT || env.APP_PORT}/`
    )
  })
}
