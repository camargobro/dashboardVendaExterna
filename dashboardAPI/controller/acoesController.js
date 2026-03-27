import dbAcoes from '../dbAcoes.js';
import { verificaIdPonto } from '../regrasNegocios/regrasNegociosAcoes.js';
import { criarAcao, mostrarAcoes } from '../services/acoesServices.js';
export async function getAcoes(req, res) {
    try{
        await res.status(200).json(mostrarAcoes());
    }catch(error){
        console.error("Erro ao obter ações:", error);
        res.status(500).json({ error: "Erro ao obter ações" });
    }
}

export async function postAcoes(req, res) {
    try{
        const { pontoId, data, leads, vendas } = req.body;
        if(!pontoId || !data || leads === undefined || vendas === undefined){
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const novaAcao = criarAcao({ pontoId, data, leads, vendas });
        res.status(201).json(novaAcao);
    }catch(error){
        console.error("Erro ao criar ação:", error);
        res.status(500).json({ error: "Erro ao criar ação" });
    }
}
    