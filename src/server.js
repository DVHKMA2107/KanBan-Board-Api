import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from './config/environment'

connectDB()
  .then(() => console.log('Connected successfully to database sever'))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error)
    process.exit()
  })

const bootServer = () => {
  const app = express()

  app.get('/test', async (req, res) => {
    res.end('<h1>Hello World! </h1><hr/>')
  })

  app.listen(env.PORT, env.HOST_NAME, () => {
    console.log(`Server is running at ${env.HOST_NAME}: ${env.PORT}/`)
  })
}
