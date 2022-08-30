const items = require('../models/items');

const createItem = async(type, hsId, taiId) => {
    return await items.create({type, hsId, taiId, status: true})
}

const findById = async(id) => {
  return await items.findOne({ taiId: id })
}

const findByHsId = async(id) => {
  return await items.findOne({ hsId: id })
}

module.exports = {
  createItem,
  findById,
  findByHsId
}