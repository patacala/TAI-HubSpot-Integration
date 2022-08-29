const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let itemsSchema = new Schema({
    type: { type: String, required: true },
    hsId: { type: String, required: true},
    taiId: { type: String, unique: true, required: true},
    status: { type: Boolean, default: true }
});

module.exports = mongoose.model('items', itemsSchema);