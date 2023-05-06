import multer from 'multer'
import path from 'path'

const pathToFolder = path.join(__dirname, '..', '..', 'Data')

function randomNum() {
	return Math.round(Math.random() * 1e9)
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, pathToFolder)
	},
	filename: function (req: any, file, cb) {
		const chunks = file.originalname.split('.')
		const extension = chunks[chunks.length - 1]
		const fileName =
			randomNum() + '-' + Date.now() + '-' + randomNum() + '.' + extension
		cb(null, fileName)
	},
})

export const upload = multer({ storage: storage })
