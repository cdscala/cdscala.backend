import mongoose from 'mongoose'

const userCollection = 'user'
const {Schema , model} = mongoose

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const UserModel = model(userCollection,userSchema)

export default UserModel