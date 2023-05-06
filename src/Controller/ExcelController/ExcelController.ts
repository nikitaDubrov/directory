import { Request, Response } from 'express'
import { ExcelService } from '../../Service/ExcelService/ExcelService'

class Excel {
	async getEmployees(req: Request, res: Response) {
		try {
			const employees = await ExcelService.getEmployees()

			if (!employees) {
				return res.status(400).json({
					errors: ['Не удалось отправить таблицу'],
					success: false,
				})
			}

			res.status(200).sendFile(employees)
		} catch (e) {
			console.log(e)
			res.status(500).json({
				errors: ['Неожиданная ошибка сервера'],
				success: false,
			})
		}
	}
}

export const ExcelController = new Excel()
