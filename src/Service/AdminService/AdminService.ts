import bcrypt from 'bcrypt'
import { AdminModel } from '../../Models'
import type { IAdmin } from '../../Types/types'

class Admin {
	async createAdmin(target: IAdmin) {
		const candidate = await AdminModel.findOne({ email: target.email })

		if (candidate) {
			return
		}

		const passwordHash = await bcrypt.hash(target.password, 5)

		const admin = await AdminModel.create({ ...target, password: passwordHash })

		return admin._doc
	}

	async removeAdmin(id: string, password: string) {
		const candidate = await AdminModel.findById({ _id: id })

		if (!candidate) {
			return
		}

		const isPassword = await bcrypt.compare(password, candidate.password)

		if (!isPassword) {
			return
		}

		const res = await AdminModel.deleteOne({ _id: id })

		const isRemove = !!res.deletedCount

		return isRemove
	}

	async updateAdmin(id: string, password: string, target: Partial<IAdmin>) {
		const candidate = await AdminModel.findById({ _id: id })

		if (!candidate) {
			return
		}

		if (target.email) {
			const candidate = await AdminModel.findOne({ email: target.email })
			if (candidate) return
		}

		const isPassword = await bcrypt.compare(password, candidate.password)

		if (!isPassword) {
			return
		}

		const data = { ...target } as IAdmin

		if (data.password) {
			const passwordHash = await bcrypt.hash(data.password, 5)
			data.password = passwordHash
		}

		const admin = await AdminModel.updateOne({ _id: id }, data)

		return admin.acknowledged
	}

	async getAdmin(id: string) {
		const admin = await AdminModel.findById({ _id: id })

		return admin?._doc
	}

	async auth(email: string, password: string) {
		const candidate = await AdminModel.findOne({ email })

		if (!candidate) {
			return
		}

		const isPassword = await bcrypt.compare(password, candidate.password)

		if (!isPassword) {
			return
		}

		return candidate._doc
	}
}

export const AdminService = new Admin()
