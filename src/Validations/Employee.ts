import { body, param } from 'express-validator'

const createEmployee = [
	body('fullName')
		.notEmpty()
		.withMessage("Поле 'fullName' не может быть пустым"),
	body('email')
		.isEmail()
		.withMessage('Некорректная почта')
		.isLength({ min: 1, max: 320 })
		.withMessage('Длина почты должна попадать в промежуток от 1 до 320'),
	body('number')
		.notEmpty()
		.withMessage("Поле 'number' не может быть пустым")
		.isString()
		.withMessage('Номер должен быть в формате строки')
		.isLength({ min: 11, max: 13 })
		.withMessage('Длина номера должна попадать в промежуток от 11 до 13'),
	body('role').notEmpty().withMessage("Поле 'role' не может быть пустым"),
	body('department')
		.notEmpty()
		.withMessage("Поле 'department' не может быть пустым"),
	body('subdivision')
		.notEmpty()
		.withMessage("Поле 'subdivision' не может быть пустым"),
]

const updateEmployee = [
	body('id').notEmpty().withMessage('Некорректный id'),
	body('fullName').optional(),
	body('email').optional(),
	body('number').optional(),
	body('role').optional(),
	body('subdivision').optional(),
	body('department').optional(),
]

const getEmployee = [
	param('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
]

const removeEmployee = [
	body('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
]

export { createEmployee, updateEmployee, getEmployee, removeEmployee }
