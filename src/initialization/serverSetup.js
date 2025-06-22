import express from 'express'
import dotenv from 'dotenv'
import DBstart from './database.js'
import router from '../router/routes.js'

dotenv.config()

const PORT = process.env.SERVER_PORT

const serverSetup = async (app) => {
  await DBstart()
  app.use(express.json({ extended: true }))
  app.use('/api', router)
  return app.listen(PORT, () => console.log(`started on port ${PORT}`))
}

export default serverSetup
