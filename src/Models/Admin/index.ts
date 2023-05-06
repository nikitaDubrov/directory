import { model, Schema } from 'mongoose'
import type { IAdmin } from '../../Types/types'

const AdminSchema = new Schema<IAdmin>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
)

export const AdminModel = model<IAdmin>('Admin', AdminSchema)
