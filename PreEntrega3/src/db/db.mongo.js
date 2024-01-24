import mongoose from 'mongoose'
import config from "../config/env.config.js"

const mongo = async () => {
  try {
    await mongoose.connect(config.db)
    console.log("Base de datos conectada")
  } catch (error) {
    console.log(error)
  }
}

export default mongo