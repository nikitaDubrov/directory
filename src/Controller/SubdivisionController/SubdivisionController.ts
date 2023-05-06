import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { SubdivisionService } from '../../Service/SubdivisionService/SubdivisionService'
import type { IDocsSubdivision, ISubdivision } from '../../Types/types'

class Subdivision {
	async createSubdivision(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { name } = req.body

			const target: ISubdivision = { name }

			const subdivision = await SubdivisionService.createSubdivision(target)

			if (!subdivision) {
				return res.status(400).json({
					errors: ['Не удалось создать подразделение'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, ...args } = subdivision

			res.status(200).json({
				subdivision: args,
				success: true,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}

	async removeSubdivision(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id } = req.body

			const result = await SubdivisionService.removeSubdivision(id)

			if (!result) {
				return res.status(400).json({
					errors: ['Не удалось удалить подразделение'],
					success: false,
				})
			}

			res.status(200).json({
				success: true,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}

	async updateSubdivision(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id, target } = req.body

			const subdivision = await SubdivisionService.updateSubdivision(
				id,
				target as ISubdivision,
			)

			if (!subdivision) {
				return res.status(400).json({
					errors: ['Не удалось обновить подразделение'],
					success: false,
				})
			}

			res.status(200).json({
				success: true,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}

	async getSubdivision(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id } = req.params

			const subdivision = await SubdivisionService.getSubdivision(id)

			if (!subdivision) {
				return res.status(400).json({
					errors: ['Не удалось получить подразделение'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, ...args } = subdivision

			res.status(200).json({
				subdivision: args,
				success: true,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}

	async getSubdivisions(req: Request, res: Response) {
		try {
			const subdivisions = await SubdivisionService.getSubdivisions()

			if (!subdivisions) {
				return res.status(400).json({
					errors: ['Не удалось получить подразделение'],
					success: false,
				})
			}

			const sentSubdivision = []

			for (const subdivision of subdivisions) {
				const { createdAt, __v, updatedAt, ...args } =
					subdivision._doc as IDocsSubdivision

				sentSubdivision.push(args)
			}

			res.status(200).json({
				subdivisions: sentSubdivision,
				success: true,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}
}

export const SubdivisionController = new Subdivision()
