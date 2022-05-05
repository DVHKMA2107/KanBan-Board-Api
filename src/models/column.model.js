import Joi from 'joi'
import { getDB } from '*/config/mongodb'

const columnCollectionName = 'columns'
const columnCollectionSchemma = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cardOrder: Joi.array().items(Joi.string).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchemma = async (data) => {
  return await columnCollectionSchemma.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const value = await validateSchemma(data)
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value)
    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}

export const ColumnModel = { createNew }
