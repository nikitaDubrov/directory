import { EmployeeModel, SubdivisionModel } from '../../Models'
import type { ISubdivision } from '../../Types/types'

class Subdivision {
	async createSubdivision(target: ISubdivision) {
		const candidate = await SubdivisionModel.findOne({ name: target.name })

		if (candidate) {
			return
		}

		const subdivision = await SubdivisionModel.create(target)

		return subdivision._doc
	}

	async removeSubdivision(id: string) {
		const candidate = await SubdivisionModel.findById({ _id: id })

		if (!candidate) {
			return
		}

		const res = await SubdivisionModel.deleteOne({ _id: id })

		const isRemove = !!res.deletedCount

		return isRemove
	}

	async updateSubdivision(id: string, target: Partial<ISubdivision>) {
		const candidate = await SubdivisionModel.findById({ _id: id })

		if (!candidate) {
			return
		}

		if (target.name) {
			const candidate = await SubdivisionModel.findOne({ name: target.name })
			if (candidate) return
		}

		const subdivision = await SubdivisionModel.updateOne({ _id: id }, target)

		return subdivision
	}

	async getSubdivision(id: string) {
		const subdivision = await SubdivisionModel.findById({ _id: id })

		if (!subdivision) {
			return
		}

		const employees = await EmployeeModel.findOne({
			subdivision: subdivision.name,
		})

		return {
			...subdivision._doc,
			employees: employees || [],
		}
	}

	async getSubdivisions() {
		const subdivision = await SubdivisionModel.find()

		if (!subdivision) {
			return
		}

		return subdivision
	}
}

export const SubdivisionService = new Subdivision()
