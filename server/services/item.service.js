const items = require('../models/items');

const createItem = async(type, hsId, taiId) => {
    return await items.create({type, hsId, taiId, status: true})
}

const findById = async(id) => {
  return await items.findOne({ taiId: id })
}

module.exports = {
  createItem,
  findById
}