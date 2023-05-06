interface IAdmin {
	email: string
	password: string
	_doc?: IDocsAdmin
}

interface ISubdivision {
	name: string
	_doc?: IDocsSubdivision
}

interface IEmployee {
	fullName: string
	email: string
	number: string
	role: string
	photo: string
	department: string
	subdivision: string
	_doc?: IDocsEmployee
}

interface IDocsEmployee extends IEmployee {
	_id?: string
	updatedAt?: Date
	createdAt?: Date
	__v?: number
}

interface IDocsAdmin extends IAdmin {
	_id?: string
	updatedAt?: Date
	createdAt?: Date
	__v?: number
}

interface IDocsSubdivision extends ISubdivision {
	_id?: string
	updatedAt?: Date
	createdAt?: Date
	__v?: number
}

export {
	IEmployee,
	IAdmin,
	ISubdivision,
	IDocsEmployee,
	IDocsAdmin,
	IDocsSubdivision,
}
