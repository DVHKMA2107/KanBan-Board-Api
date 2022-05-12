import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

const boardCollectionName = 'boards'
const boardCollectionSchemma = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchemma = async (data) => {
  return await boardCollectionSchemma.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const value = await validateSchemma(data)
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value)
    return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

const updateColumnOrder = async (boardId, newColumnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(boardId) },
        { $push: { columnOrder: newColumnId } },
        { returnOriginal: false }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardID) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectID(boardID),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ])
      .toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: updateData },
        { returnOriginal: false }
      )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = { createNew, getFullBoard, updateColumnOrder, update }
