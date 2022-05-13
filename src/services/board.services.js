import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data)
    const getNewBoard = await BoardModel.findOneById(
      createdBoard.insertedId.toString()
    )
    return getNewBoard
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.getFullBoard(id)
    if (!board || !board.columns) {
      throw new Error('Board not found')
    }

    const transformBoard = cloneDeep(board)

    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    )
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })

    delete transformBoard.cards
    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now()
    }
    if (updateData._id) delete updateData._id
    if (updateData.columns) delete updateData.columns

    const updatedBoard = await BoardModel.update(id, updateData)
    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard, update }
