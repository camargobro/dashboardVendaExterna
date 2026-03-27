import dbAcoes from "../dbAcoes.js";
import { verificaIdPonto } from "../regrasNegocios/regrasNegociosAcoes.js";

export function mostrarAcoes() {
    return dbAcoes;
}

export function criarAcao({pontoId, data, leads, vendas}) {
    
     const novaAcao = {
            _id: String(Date.now()), 
            pontoId,
            data,
            leads,
            vendas
        };
    if(!verificaIdPonto(pontoId)){
        throw new Error("Id do ponto inválido");
    }
    dbAcoes.push(novaAcao);
    return novaAcao;
}
