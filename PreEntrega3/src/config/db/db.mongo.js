import mongoose from 'mongoose'
import config from "../server.config.js"

const mongo = async () => {
  try {
    await mongoose.connect(config.db, {})
    const db = mongoose.connection;
    db.on(
      "error",
      console.error.bind(console, "Error de conexión a la base de datos:")
    );
    db.once("open", () => {
      console.log("Conectado a la base de datos");
    });

  } catch (error) {
    console.log(error)
  }
}

export default mongo