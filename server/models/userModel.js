const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

module.exports = model("User", UserSchema);