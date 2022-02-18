const mongoose = require("mongoose");

const conn = mongoose.createConnection("mongodb://localhost:27017/test");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = conn.model('User', UserSchema);

const model = { User };
module.exports = function (modelName) {
    return model[modelName];
}
