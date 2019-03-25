const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true}
})

let UserModel = mongoose.model('usuarios', UserSchema);

module.exports = UserModel;
