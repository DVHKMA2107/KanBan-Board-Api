import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from './config/environment'

const app = express()

connectDB().catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.end('<h1>Hello World! </h1><hr/>')
})

app.listen(env.PORT, env.HOST_NAME, () => {
  console.log(`Server is running at ${env.HOST_NAME}: ${env.PORT}/`)
})
