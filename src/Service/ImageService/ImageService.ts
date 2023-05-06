import fs from 'fs'
import path from 'path'

class Image {
	private defaultPath = path.join(__dirname, '..', '..', 'Data')

	async getImage(id: string) {
		const fullPath = path.join(this.defaultPath, id)

		const isExists = fs.existsSync(fullPath)

		if (!isExists) {
			return
		}

		fs.readFile(fullPath, e => {
			if (e) return
		})

		return fullPath
	}

	async removeImage(id: string) {
		const fullPath = path.join(this.defaultPath, id)

		const isExists = fs.existsSync(fullPath)

		if (!isExists) {
			return
		}

		fs.unlink(fullPath, e => {
			if (e) return
		})

		return true
	}
}

export const ImageService = new Image()
