const { Schema, model } = require('mongoose');

const empSchema = new Schema(
  {
  nombre: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  correo: {
    type: String, required: true
  },
  direccion: {
    type: String, required: true
  },
  date: {
    type: Date, default: Date.now
  }
});

module.exports = model('Empleado', empSchema);
