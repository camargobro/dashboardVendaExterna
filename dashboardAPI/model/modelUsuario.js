import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
});



export const Usuario = mongoose.model('Usuario', usuarioSchema);

export async function postUsuario(usuario) {
  const novoUsuario = new Usuario(usuario)
  return await novoUsuario.save();
}

export async function getUsuarios() {
  return await Usuario.find().select('-senha');
}

export async function deleteUsuario(id) {
  return await Usuario.findByIdAndDelete(id);
}

