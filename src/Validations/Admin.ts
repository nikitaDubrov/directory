import { body, param } from 'express-validator'

const createAdmin = [
	body('email')
		.isEmail()
		.withMessage('Некорректная почта')
		.isLength({ min: 1, max: 320 })
		.withMessage('Длина почты должна попадать в промежуток от 1 до 320'),
	body('password')
		.notEmpty()
		.withMessage('Не удалось найти поле password')
		.isString()
		.withMessage('Пароль должен быть в строковом формате')
		.isLength({ min: 8, max: 32 })
		.withMessage('Длина пароля должна попадать в промежуток от 8 до 32'),
]

const updateAdmin = [
	body('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
	body('password')
		.notEmpty()
		.withMessage('Не удалось найти поле password')
		.isString()
		.withMessage('Пароль должен быть в строковом формате')
		.isLength({ min: 8, max: 32 })
		.withMessage('Длина пароля должна попадать в промежуток от 8 до 32'),

	body('target')
		.isObject()
		.withMessage("Поле 'target' должно быть объектом")
		.notEmpty()
		.withMessage("Поле 'target' не может быть пустым"),
	body('target.email')
		.optional()
		.isEmail()
		.withMessage('Некорректная почта')
		.isLength({ min: 1, max: 320 })
		.withMessage('Длина почты должна попадать в промежуток от 1 до 320'),
	body('target.password')
		.optional()
		.isLength({ min: 8, max: 32 })
		.withMessage('Длина пароля должна попадать в промежуток от 8 до 32'),
]

const getAdmin = [
	param('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
]

const removeAdmin = [
	body('id')
		.notEmpty()
		.withMessage('Некорректный id')
		.isLength({ min: 24, max: 24 })
		.withMessage('Некорректный id'),
	body('password')
		.isString()
		.withMessage('Пароль должен быть в строковом формате')
		.isLength({ min: 8, max: 32 })
		.withMessage('Длина пароля должна попадать в промежуток от 8 до 32'),
]

const auth = [
	body('email')
		.isEmail()
		.isLength({ min: 1, max: 320 })
		.withMessage('Длина почты должна попадать в промежуток от 1 до 320'),
	body('password')
		.isString()
		.isLength({ min: 8, max: 32 })
		.withMessage('Длина пароля должна попадать в промежуток от 8 до 32'),
]

export { createAdmin, updateAdmin, getAdmin, removeAdmin, auth }
