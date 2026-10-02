import mongoose from 'mongoose';

const acoesSchema = new mongoose.Schema({
  pontoId: { type: String, required: true },
  data: { type: Date, required: true },
  leads: { type: Number, required: true },
  vendas: { type: Number, required: true },
  empresaId: { type: String, required: true}
});



export const Acoes = mongoose.model('Acoes', acoesSchema);

export async function postAcoes(acao) {
  const novaAcao = new Acoes(acao)
  return await novaAcao.save();
}

export async function getAcoes(empresaId) {
  return await Acoes.find({empresaId});
}

export async function deleteAcao(id, empresaId) {
    return await Acoes.findOneAndDelete({ _id: id, empresaId });
}
