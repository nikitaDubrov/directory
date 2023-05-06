import { ImageController } from '../../Controller/ImageController/ImageController'
import { EmployeeModel } from '../../Models'
import type { IEmployee } from '../../Types/types'

class Employee {
	async createEmployee(target: IEmployee) {
		const candidate = await EmployeeModel.findOne({ email: target.email })

		if (candidate) {
			return
		}

		const employee = await EmployeeModel.create(target)

		return employee._doc
	}

	async removeEmployee(id: string) {
		const candidate = await EmployeeModel.findById({ _id: id })

		if (!candidate) {
			return
		}

		const res = await EmployeeModel.deleteOne({ _id: id })

		const isImageRemove = await ImageController.removeImage(candidate.photo)

		const isRemove = !!res.deletedCount && isImageRemove

		return isRemove
	}

	async updateEmployee(id: string, target: Partial<IEmployee>) {
		const candidate = await EmployeeModel.findById({ _id: id })

		if (!candidate) {
			return
		}

		if (target.email) {
			const candidate = await EmployeeModel.findOne({ email: target.email })
			if (candidate) return
		}

		if (target.photo) {
			await ImageController.removeImage(candidate.photo)
		}

		const { acknowledged } = await EmployeeModel.updateOne({ _id: id }, target)

		return acknowledged
	}

	async getEmployee(id: string) {
		const employee = await EmployeeModel.findById({ _id: id })

		if (!employee) {
			return
		}

		return employee._doc
	}

	async getAll() {
		const employees = await EmployeeModel.find()

		return employees
	}
}

export const EmployeeService = new Employee()
