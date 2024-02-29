const {Schema, model} = require("mongoose");

const ResultSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    score: {type: String, required: true}
});

module.exports = model("Result", ResultSchema);