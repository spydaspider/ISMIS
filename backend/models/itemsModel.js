const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    costPrice:{
        type: Number,
        required: true
    },
    sellingPrice:{
        type: Number,
        required: true
    }
},{timeStamp: true});
module.exports = mongoose.model('Item', ItemSchema);