import mongoose from 'mongoose';

const acoesSchema = new mongoose.Schema({
  pontoId: { type: String, required: true },
  data: { type: Date, required: true },
  leads: { type: Number, required: true },
  vendas: { type: Number, required: true },
});



export const Acoes = mongoose.model('Acoes', acoesSchema);

export async function postAcoes(acao) {
  const novaAcao = new Acoes(acao)
  return await novaAcao.save();
}

export async function getAcoes() {
  return await Acoes.find();
}

export async function deleteAcao(id) {
  return await Acoes.findByIdAndDelete(id);
}

