import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:1234567890@cluster0.rxlttmc.mongodb.net/paytm")

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    name: String,
    email: String,
    amount: Number
})

const userModal = mongoose.modal("User", userSchema);


export default userModal;