import type { Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result'
import { AdminService } from '../../Service/AdminService/AdminService'
import type { IAdmin } from '../../Types/types'

class Admin {
	async createAdmin(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const target: IAdmin = {
				email: req.body.email,
				password: req.body.password,
			}

			const admin = await AdminService.createAdmin(target)

			if (!admin) {
				return res.status(400).json({
					errors: ['Не удалось создать администратора'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, password, ...args } = admin

			res.status(200).json({
				admin: args,
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

	async removeAdmin(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id, password } = req.body

			const result = await AdminService.removeAdmin(id, password)

			if (!result) {
				return res.status(400).json({
					errors: ['Не удалось удалить Администратора'],
					success: false,
				})
			}

			res.status(200).json({
				success: result,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}

	async updateAdmin(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { target, password, id } = req.body

			const admin = await AdminService.updateAdmin(
				id,
				password,
				target as IAdmin,
			)

			if (!admin) {
				return res.status(400).json({
					errors: ['Не удалось обновить Администратора'],
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

	async getAdmin(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id } = req.params

			const admin = await AdminService.getAdmin(id)

			if (!admin) {
				return res.status(400).json({
					errors: ['Не удалось получить Администратора'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, password, ...args } = admin

			res.status(200).json({
				admin: args,
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

	async auth(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const admin = await AdminService.auth(req.body.email, req.body.password)

			if (!admin) {
				return res.status(400).json({
					errors: ['Не удалось авторизоваться'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, password, ...args } = admin

			res.status(200).json({
				admin: args,
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

export const AdminController = new Admin()
