const {Schema, model} = require("mongoose");

const TestSchema = new Schema({
    title: {type: String, unique: true, required: true},
    questions: {type: Array, required: true},
});

module.exports = model("Test", TestSchema);