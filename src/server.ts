import express from 'express'

const server = express()

server.all('/', (req, res) => {
	res.send('Server is online')
})

function keepAlive() {
	server.listen(3000, () => {
		console.log('Server is online')
	})
}

export { keepAlive }
