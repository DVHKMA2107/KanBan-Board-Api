import Joi from 'joi'
import { ObjectId } from 'mongodb'
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

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

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
      boardId: ObjectId(validatedValue.boardId)
    }
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertedValue)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnDocument: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    if (data.boardId) {
      updateData.boardId = ObjectId(data.boardId)
    }
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  updateCardOrder,
  findOneById
}
