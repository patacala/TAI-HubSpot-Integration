const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let itemsSchema = new Schema({
    type: { type: String, required: true },
    hsId: { type: String, required: true},
    taiId: { type: String, index: true, unique: true, required: true, uniqueCaseInsensitive: true},
    status: { type: Boolean, default: true }
});

itemsSchema.plugin(uniqueValidator)
module.exports = mongoose.model('items', itemsSchema);