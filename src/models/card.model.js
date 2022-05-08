import Joi from 'joi'
import { ObjectID } from 'mongodb'
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
    const validatedValue = await validateSchemma(data)
    const insertedValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId),
      columnId: ObjectID(validatedValue.columnId)
    }
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertedValue)
    return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { cardCollectionName, createNew }
