const Item = require('../models/itemsModel.js');
//getItems
const mongoose = require('mongoose');
const getItems = async(req,res) =>{
    try {
       const item = await Item.find({}).sort({createdAt: -1});
       res.status(200).json(item);
    } 
    catch (error) {
        res.status(401).json({error: error.message});
    }
}
//create items
const createItem = async(req,res)=>{
   const { itemName,quantity, costPrice, sellingPrice } = req.body;
   try {
          let emptyFields = [];
          if(!itemName)
          {
             emptyFields.push('itemName');
          }
          if(!quantity)
          {
            emptyFields.push('quantity');
          }
          if(!costPrice)
          {
            emptyFields.push('costPrice');
          }
          if(!selling)
          {
            emptyFields.push('selling');
          }
          if(emptyFields.length > 0)
          {
            res.status(401).json({error:'Fill in all fields'});
          }
          const item = await Item.create({itemName, quantity, costPrice, sellingPrice});
          res.status(200).json(item);
       }
   catch (error) {
        res.status(401).json({error:error.message});
   } 
}
//get a single item
const getItem = async(req,res) =>{
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const updateItem = async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({error: 'No such item'});
    }
    try {
        const item = await Item.findOneAndUpdate({_id: id});
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({error: 'No such item'});
    }
}
const deleteItem = async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({error: 'No such item'});

    }
    try{
              const item = await Item.findOneAndDelete({_id: id});
              res.status(200).json(item);
    }
    catch(error)
    {
        res.status(400).json({error: 'No such item'});
    }
}
module.exports = {
    createItem, updateItem, getItems, getItem, deleteItem
}