
import { getAcoes, postAcoes } from '../model/modelAcao.js';
import { verificaIdPonto } from '../regrasNegocios/regrasNegociosAcoes.js';

export async function buscarAcoes(req, res) {
    try {
        const acoes = await getAcoes();
        res.status(200).json(acoes);
    } catch(error){
        console.error("Erro ao obter ações:", error);
        res.status(500).json({ error: "Erro ao obter ações" });
    }
}

export async function criarAcoes(req, res) {
    try {
        const { pontoId, data, leads, vendas } = req.body;
        if(!pontoId || !data || leads === undefined || vendas === undefined){
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Validar se pontoId existe
        const pontoExiste = await verificaIdPonto(pontoId);
        if (!pontoExiste) {
            return res.status(404).json({ error: "Ponto com esse ID não existe" });
        }

        const novaAcao = await postAcoes({ pontoId, data, leads, vendas });
        res.status(201).json(novaAcao);
    } catch(error){
        console.error("Erro ao criar ação:", error);
        res.status(500).json({ error: "Erro ao criar ação" });
    }
}
    