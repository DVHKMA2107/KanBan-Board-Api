import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb'

const columnCollectionName = 'columns'
const columnCollectionSchemma = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
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
    const validatedValue = await validateSchemma(data)
    const insertedValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId)
    }
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertedValue)
    return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

const updateCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(columnId) },
        { $push: { cardOrder: cardId } },
        { returnOriginal: false }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, updateData) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: updateData },
        { returnOriginal: false }
      )
    console.log(result)
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  updateCardOrder
}
