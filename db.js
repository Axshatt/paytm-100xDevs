import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:1234567890@cluster0.rxlttmc.mongodb.net/paytm")

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50

    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const userModal = mongoose.modal("User", userSchema);


module.exports = {
    userModal
}