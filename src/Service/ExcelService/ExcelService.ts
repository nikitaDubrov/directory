import { Workbook } from 'exceljs'
import path from 'path'
import { EmployeeModel } from '../../Models'

class Excel {
	private defaultPath = path.join(__dirname, '..', '..', 'Data')

	async getEmployees() {
		const employees = await EmployeeModel.find()

		if (!employees.length) return

		const fileName = 'directory.xlsx'

		const fullPath = path.join(this.defaultPath, fileName)

		const workbook = new Workbook()

		const worksheet = workbook.addWorksheet('Справочник')

		worksheet.columns = [
			{ header: '№', key: 'number', width: 5 },
			{ header: 'ФИО', key: 'name', width: 40 },
			{ header: 'Номер', key: 'phone_number', width: 25 },
			{ header: 'Почта', key: 'email', width: 30 },
			{ header: 'Должность', key: 'role', width: 40 },
			{ header: 'Отдел', key: 'department', width: 40 },
			{ header: 'Структурное подразделение', key: 'subdivision', width: 40 },
		]

		worksheet.getRow(1).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFC0C0C0' },
		}

		worksheet.getRow(1).eachCell(cell => {
			cell.style = { font: { bold: true } }
		})

		const data = []

		for (const [index, employee] of employees.entries()) {
			const row = {
				number: index + 1,
				name: employee.fullName,
				phone_number: employee.number,
				email: employee.email,
				role: employee.role,
				subdivision: employee.subdivision,
				department: employee.department,
			}

			data.push(row)
		}

		worksheet.addRows(data)

		worksheet.eachRow((row, rowNumber) => {
			row.eachCell(cell => {
				cell.border = {
					top: { style: 'thin' },
					left: { style: 'thin' },
					bottom: { style: 'thin' },
					right: { style: 'thin' },
				}
				cell.alignment = { vertical: 'middle', horizontal: 'center' }
				if (rowNumber === 1) {
					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: { argb: 'FFC0C0C0' },
					}
					cell.font = { bold: true }
				}
			})
			row.height = 25
			row.getCell('A').value = rowNumber - 1
		})

		await workbook.xlsx.writeFile(fullPath)

		return fullPath
	}
}

export const ExcelService = new Excel()
