import mongoose from 'mongoose'

const userCollection = 'user'
const {Schema , model} = mongoose

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true, default:0 },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String }
})

const UserModel = model(userCollection,userSchema)

export default UserModel