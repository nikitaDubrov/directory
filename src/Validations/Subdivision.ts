import { body, param } from 'express-validator'

const createSubdivision = [
	body('name')
		.notEmpty()
		.withMessage("Поле 'name' не может быть пустым")
		.isString()
		.withMessage("Поле 'name' должно быть в строковом формате")
		.isLength({ min: 3, max: 32 })
		.withMessage("Длина поля 'name' должна попадать в промежуток от 3 до 32"),
]

const updateSubdivision = [
	body('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),

	body('target')
		.notEmpty()
		.withMessage("Поле 'target' не может быть пустым")
		.isObject()
		.withMessage("Поле 'target' должно быть объектом"),
	body('target.name')
		.optional()
		.notEmpty()
		.withMessage("Поле 'name' не должно быть пустым")
		.isString()
		.withMessage("Поле 'name' должно быть в строковом формате")
		.isLength({ min: 3, max: 32 })
		.withMessage("Длина поля 'name' должна попадать в промежуток от 3 до 32"),
]

const getSubdivision = [
	param('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
]

const removeSubdivision = [
	body('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
]

export {
	createSubdivision,
	updateSubdivision,
	getSubdivision,
	removeSubdivision,
}
