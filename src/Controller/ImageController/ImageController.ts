import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ImageService } from '../../Service/ImageService/ImageService'

class Image {
	async getImage(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id } = req.params

			const img = await ImageService.getImage(id)

			if (!img) {
				return res.status(400).json({
					errors: ['Не удалось найти изображение'],
					success: false,
				})
			}

			res.status(200).sendFile(img)
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}

	async removeImage(id: string) {
		try {
			if (!id) {
				console.log('Не удалось получить id до изображения')
				return
			}

			const res = await ImageService.removeImage(id)

			if (!res) {
				console.log('Не удалось удалить файл')
				return
			}

			return res
		} catch (e) {
			console.log(e)
		}
	}
}

export const ImageController = new Image()
