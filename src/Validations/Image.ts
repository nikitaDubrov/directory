import { param } from 'express-validator'

const getImage = [param('id').notEmpty().withMessage('Некорректный id')]

export { getImage }
