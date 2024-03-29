const express = require('express');
const router = express.Router();
const requireAuthentication = require('../middleware/requireAuthentication.js');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemsController.js');
router.use(requireAuthentication);
router.get('/', getItems);
router.post('/', createItem);
router.get('/:id',getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
module.exports = router;