import mongoose from 'mongoose';

const pontosSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  tipo: { type: String, required: true },
});

export const Pontos = mongoose.model('Pontos', pontosSchema);

export async function postPonto(ponto) {
  const novoPonto = new Pontos(ponto);
  return await novoPonto.save();
}

export async function getPontos() {
  return await Pontos.find();
}
