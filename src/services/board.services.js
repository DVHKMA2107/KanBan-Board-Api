import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
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

export const BoardService = { createNew, getFullBoard }
