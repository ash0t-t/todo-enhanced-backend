const express = require('express');
const ItemsService = require('../services/items');
const Validator = require('../core/validator');
const ResponseHandler = require('../core/response');
const Router = express.Router();

Router.get('/', async (req, res) => {
  const start = Date.now();
  const { offset, limit } = req.query;
  const off = parseInt(offset);
  const lim = parseInt(limit);
  if (!Validator.isPositiveInteger(off) || !Validator.isPositiveInteger(lim)) {
    return ResponseHandler.error(res, 'Invalid offset or/and limit', 400);
  }
  try {
    const result = await ItemsService.getAllItems(off, lim);
    const nextUrl = `localhost:3000/items?offset=${off + lim}&limit=${lim}`;
    const duration = (Date.now() - start) / 1000;
    ResponseHandler.success(res, {
      count: result.length,
      duration,
      nextUrl,
      items: result,
    });
  } catch (ex) {
    return ResponseHandler.error(res, ex.name || ex.message, ex.code || 500);
  }
});

Router.get('/:id', async (req, res) => {
  const start = Date.now();
  const { id } = req.params;
  if (!Validator.isValidObjectId(id)) {
    return ResponseHandler.error(res, 'Invalid ID', 400);
  }
  try {
    const result = await ItemsService.getItemById(id);
    if (!result) return ResponseHandler.error(res, 'Item not found', 604);
    const duration = (Date.now() - start) / 1000;
    ResponseHandler.success(res, { duration, item: result });
  } catch (ex) {
    return ResponseHandler.error(res, ex.message, 500);
  }
});

Router.post('/', async (req, res) => {
  const start = Date.now();
  const { title } = req.body;
  if (!Validator.isNotEmptyString(title)) {
    return ResponseHandler.error(
      res,
      'Title is required and must be a non-empty string',
      400
    );
  }
  try {
    const newItem = await ItemsService.createItem(title);
    const duration = (Date.now() - start) / 1000;
    ResponseHandler.success(res, { duration, item: newItem }, 201);
  } catch (ex) {
    return ResponseHandler.error(res, ex.message, 500);
  }
});

Router.patch('/:id', async (req, res) => {
  const start = Date.now();
  const { id } = req.params;
  const { title } = req.body;
  if (!Validator.isValidObjectId(id)) {
    return ResponseHandler.error(res, 'Invalid ID', 400);
  }
  if (!Validator.isNotEmptyString(title)) {
    return ResponseHandler.error(
      res,
      'Title is required',
      400
    );
  }
  try {
    const updatedItem = await ItemsService.updateItemById(id, title);
    if (!updatedItem) return ResponseHandler.error(res, 'Item not found', 404);
    const duration = (Date.now() - start) / 1000;
    ResponseHandler.success(res, { duration, item: updatedItem });
  } catch (ex) {
    return ResponseHandler.error(res, ex.message, 500);
  }
});

Router.delete('/:id', async (req, res) => {
  const start = Date.now();
  const { id } = req.params;
  if (!Validator.isValidObjectId(id)) {
    return ResponseHandler.error(res, 'Invalid ID', 400);
  }
  try {
    const result = await ItemsService.deleteItemById(id);
    if (!result) return ResponseHandler.error(res, 'Item not found', 404);

    const duration = (Date.now() - start) / 1000;
    ResponseHandler.success(res, { duration, message: 'Deleted successfully' });
  } catch (ex) {
    return ResponseHandler.error(res, ex.message, 500);
  }
});

module.exports = Router;
