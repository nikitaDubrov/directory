import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { router } from './Router/Router'
import { keepAlive } from './server'

const PORT = process.env.PORT || 5000
const URL_DB = process.env.URL_DB

const app = express()

app.use(cors({ credentials: true, origin: true }))
app.use(express.json())
app.use('/', router)

const start = async () => {
	try {
		if (!URL_DB) {
			console.log('Не удалось найти URL от БД')
			return
		}

		await mongoose.connect(URL_DB)

		app.listen(PORT, () => {
			console.log(`Сервер запустился на ${PORT} порту`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()

keepAlive()
