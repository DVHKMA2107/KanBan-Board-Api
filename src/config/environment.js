require('dotenv').config()

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST_NAME: process.env.HOST,
  APP_PORT: process.env.APP_PORT
}
