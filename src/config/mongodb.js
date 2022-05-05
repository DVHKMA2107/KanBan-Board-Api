import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  try {
    await client.connect()

    console.log('Connect to database success')

    await listDatabases(client)
  } finally {
    await client.close()
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases()
  databaseList.databases.forEach((db) => console.log(db.name))
}
