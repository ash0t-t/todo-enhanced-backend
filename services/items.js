const { InvalidOffset, InvalidQuantity, InvalidLimit, ItemNotFound, InvalidTitle } = require('../core/errors');
const itemsModel = require('../models/items');
const Validator = require('../core/validator');

class ItemsService {
  static async getAllItems(offset, limit) {
    if (!Validator.isPositiveInteger(offset)) throw new InvalidOffset();
    if (!Validator.isPositiveInteger(limit)) throw new InvalidLimit();
    const result = await itemsModel.find().skip(offset).limit(limit).exec();
    if (result.length == 0) throw new InvalidQuantity();
    return result;
  }

  static async getItemById(id) {
    if (!Validator.isValidObjectId(id)) throw new ItemNotFound();
    const item = await itemsModel.findById(id).exec();
    if (!item) throw new ItemNotFound();
    return item;
  }

  static async createItem(title) {
    if (!Validator.isNotEmptyString(title)) throw new InvalidTitle();
    const newItem = new itemsModel({ title });
    return await newItem.save();
  }

  static async updateItemById(id, newTitle) {
    if (!Validator.isValidObjectId(id)) throw new ItemNotFound();
    if (!Validator.isNotEmptyString(newTitle)) throw new InvalidTitle();
    const updatedItem = await itemsModel.findByIdAndUpdate(id, { title: newTitle }, { new: true }).exec();
    if (!updatedItem) throw new ItemNotFound();
    return updatedItem;
  }

  static async deleteItemById(id) {
    if (!Validator.isValidObjectId(id)) throw new ItemNotFound();
    const deletedItem = await itemsModel.findByIdAndDelete(id).exec();
    if (!deletedItem) throw new ItemNotFound();
    return deletedItem;
  }
}

module.exports = ItemsService;