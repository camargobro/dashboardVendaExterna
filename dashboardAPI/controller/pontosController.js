
import { getPontos, postPonto, deletePonto } from '../model/modelPonto.js';
import { pontoDuplicado } from '../regrasNegocios/regrasNegociosPontos.js';

export async function buscarPontos(req, res) {
    try {
        const pontos = await getPontos(req.empresaId);
        res.status(200).json(pontos);
    } catch (error) {
        console.error("Erro ao obter pontos:", error);
        res.status(500).json({ error: "Erro ao obter pontos" });
    }
}

export async function criarPontos(req, res) {
    try {
        const { nome, endereco, bairro, cidade, tipo } = req.body;

        if (!nome || !endereco || !bairro || !cidade || !tipo) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        // Validar se ponto já existe
        const duplicado = await pontoDuplicado({ nome, endereco }, req.empresaId);
        if (duplicado) {
            return res.status(409).json({ error: "Ponto com esse nome e endereço já existe" });
        }

        const novoPonto = await postPonto({ nome, endereco, bairro, cidade, tipo, empresaId: req.empresaId });

        if (!novoPonto) {
            return res.status(400).json({ error: "Erro ao criar ponto" });
        }

        return res.status(201).json(novoPonto);
    } catch (error) {
        console.error("Erro ao criar ponto:", error);
        return res.status(500).json({ error: "Erro ao criar ponto" });
    }
}

export async function removerPonto(req, res) {
    try {
        const pontoRemovido = await deletePonto(req.params.id, req.empresaId);
        if (!pontoRemovido) {
            return res.status(404).json({ error: "Ponto com esse ID não encontrado" });
        }
        return res.status(200).json({ message: "Ponto removido com sucesso" });
    } catch (error) {
        console.error("Erro ao remover ponto:", error);
        return res.status(500).json({ error: "Erro ao remover ponto" });
    }
}