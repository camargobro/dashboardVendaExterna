import { Pontos } from '../model/modelPonto.js';

export async function verificaIdPonto(pontoId, empresaId) {
    try {
        const ponto = await Pontos.findOne({ _id: pontoId, empresaId });
        return ponto !== null;
    } catch (error) {
        console.error('Erro ao verificar ID do ponto:', error);
        return false;
    }
}