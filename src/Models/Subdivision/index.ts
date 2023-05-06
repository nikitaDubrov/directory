import { model, Schema } from 'mongoose'
import type { ISubdivision } from '../../Types/types'

const SubdivisionSchema = new Schema<ISubdivision>(
	{
		name: { type: String, required: true, unique: true },
	},
	{ timestamps: true },
)

export const SubdivisionModel = model<ISubdivision>(
	'Subdivision',
	SubdivisionSchema,
)
