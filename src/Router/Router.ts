import { Router } from 'express'
import {
	AdminController,
	EmployeeController,
	ExcelController,
	ImageController,
	SubdivisionController,
} from '../Controller'
import { validator } from '../Validations'
import { upload } from './multer/storage'

const router = Router()

// Admin
router.get('/admin/:id', validator.getAdmin, AdminController.getAdmin)
router.post('/admin', validator.createAdmin, AdminController.createAdmin)
router.post('/admin/auth', validator.auth, AdminController.auth)
router.delete('/admin', validator.removeAdmin, AdminController.removeAdmin)
router.put('/admin', validator.updateAdmin, AdminController.updateAdmin)

// Employee
router.get(
	'/employee/:id',
	validator.getEmployee,
	EmployeeController.getEmployee,
)
router.get('/employees', EmployeeController.getAll)
router.post(
	'/employee',
	upload.single('photo'),
	validator.createEmployee,
	EmployeeController.createEmployee,
)
router.delete(
	'/employee',
	validator.removeEmployee,
	EmployeeController.removeEmployee,
)
router.put(
	'/employee',
	upload.single('photo'),
	EmployeeController.updateEmployee,
)

// Subdivision
router.get('/subdivisions', SubdivisionController.getSubdivisions)
router.get(
	'/subdivision/:id',
	validator.getSubdivision,
	SubdivisionController.getSubdivision,
)
router.post(
	'/subdivision',
	validator.createSubdivision,
	SubdivisionController.createSubdivision,
)
router.delete(
	'/subdivision',
	validator.removeSubdivision,
	SubdivisionController.removeSubdivision,
)
router.put(
	'/subdivision',
	validator.updateSubdivision,
	SubdivisionController.updateSubdivision,
)

// Image
router.get('/image/:id', validator.getImage, ImageController.getImage)

// Excel
router.get('/excel', ExcelController.getEmployees)

export { router }
