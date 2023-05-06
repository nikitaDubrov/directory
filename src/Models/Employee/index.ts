import { model, Schema } from 'mongoose'
import type { IEmployee } from '../../Types/types'

const EmployeeSchema = new Schema<IEmployee>(
	{
		email: { type: String, required: true, unique: true },
		number: { type: String, required: true, unique: true },
		subdivision: { type: String, required: true },
		department: { type: String, required: true },
		fullName: { type: String, required: true },
		role: { type: String, required: true },
		photo: { type: String, required: true },
	},
	{ timestamps: true },
)

export const EmployeeModel = model<IEmployee>('Employee', EmployeeSchema)
