import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { EmployeeService } from '../../Service/EmployeeService/EmployeeService'
import type { IEmployee } from '../../Types/types'

class Employee {
	async createEmployee(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			if (!req.file) {
				return res.status(400).json({
					errors: ['Не удалось получить фотографию работника'],
					success: false,
				})
			}

			const { email, fullName, number, role, subdivision, department } =
				req.body

			const photo = req.file?.filename

			const target = {
				email,
				subdivision,
				fullName,
				number,
				role,
				department,
				photo,
			} as IEmployee

			const employee = await EmployeeService.createEmployee(target)

			if (!employee) {
				return res.status(400).json({
					errors: ['Не удалось создать сотрудника'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, ...args } = employee

			res.status(200).json({
				employee: args,
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

	async removeEmployee(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id } = req.body

			const result = await EmployeeService.removeEmployee(id)

			if (!result) {
				return res.status(400).json({
					errors: ['Не удалось удалить сотрудника'],
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

	async updateEmployee(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id, fullName, email, number, role, subdivision, department } =
				req.body

			const photo = req.file?.filename

			const target = {
				fullName,
				email,
				number,
				role,
				subdivision,
				department,
				photo,
			} as IEmployee

			const employee = await EmployeeService.updateEmployee(id, target)

			if (!employee) {
				return res.status(400).json({
					errors: ['Не удалось обновить сотрудника'],
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

	async getAll(req: Request, res: Response) {
		try {
			const employees = await EmployeeService.getAll()

			if (!employees) {
				return res.status(400).json({
					errors: ['Не удалось получить сотрудников'],
					success: false,
				})
			}

			res.status(200).json({
				employees,
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

	async getEmployee(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors,
					success: false,
				})
			}

			const { id } = req.params

			const employee = await EmployeeService.getEmployee(id)

			if (!employee) {
				return res.status(400).json({
					errors: ['Не удалось получить сотрудника'],
					success: false,
				})
			}

			const { createdAt, updatedAt, __v, ...args } = employee

			res.status(200).json({
				employee: args,
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

export const EmployeeController = new Employee()
