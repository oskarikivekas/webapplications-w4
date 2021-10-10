const mongoose = require('mongoose');
const Recipe = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: [String]
});


module.exports = mongoose.model('recipes', Recipe);