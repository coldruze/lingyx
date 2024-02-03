const {Schema, model} = require("mongoose");

const QuestionSchema = new Schema({
    text: {type: String, unique: true, required: true},
    options: {type: Array, required: true},
    correctOption: {type: Number, required: true}
});

module.exports = model("Question", QuestionSchema);