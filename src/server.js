import express from 'express'
import { mapOrder } from './utilities/sort.js'

const app = express()

const hostname = 'localhost'
const port = 6404

app.get('/', (req, res) => {
  res.end('<h1>Hello World! </h1><hr/>')
})

app.listen(port, hostname, () => {
  console.log(`Server is running at ${hostname}: ${port}/`)
})
