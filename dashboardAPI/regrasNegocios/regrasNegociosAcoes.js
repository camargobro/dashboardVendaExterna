
import { Pontos } from '../model/modelPonto.js';

export async function verificaIdPonto(pontoId) {
    try {
        const ponto = await Pontos.findById(pontoId);
        return ponto !== null;
    } catch (error) {
        console.error('Erro ao verificar ID do ponto:', error);
        return false;
    }
}