import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://carlosdscala:TEmmhXWGwrX7MUQ3@cluster0.eybydfo.mongodb.net/?retryWrites=true&w=majority', {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conectado a la base de datos');
});

export { mongoose, db };