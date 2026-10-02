
import { Pontos } from '../model/modelPonto.js';

export async function pontoDuplicado(ponto, empresaId) {
    try {
        const duplicado = await Pontos.findOne({
            nome: ponto.nome,
            endereco: ponto.endereco,
            empresaId
        });
        return duplicado !== null;
    } catch (error) {
        console.error('Erro ao verificar ponto duplicado:', error);
        return false;
    }
}