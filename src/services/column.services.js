import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)
    newColumn.cards = []
    await BoardModel.updateColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    )
    return newColumn
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
    if (updateData.cards) delete updateData.cards

    const result = await ColumnModel.update(id, updateData)

    if (result._destroy) {
      CardModel.deleteMany(result.cardOrder)
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update }
