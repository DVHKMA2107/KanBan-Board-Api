import Joi from 'joi'
import { getDB } from '*/config/mongodb'

const cardCollectionName = 'cards'
const cardCollectionSchemma = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchemma = async (data) => {
  return await cardCollectionSchemma.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const value = await validateSchemma(data)
    const result = await getDB().collection(cardCollectionName).insertOne(value)
    return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { createNew }
