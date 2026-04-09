
import { getPontos, postPonto } from '../model/modelPonto.js';
export async function buscarPontos(req, res) {
    try {
        const pontos = await getPontos();
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

        const novoPonto = await postPonto({ nome, endereco, bairro, cidade, tipo });

        if (!novoPonto) {
            return res.status(400).json({ error: "Erro ao criar ponto" });
        }

        return res.status(201).json(novoPonto);
    } catch (error) {
        console.error("Erro ao criar ponto:", error);
        return res.status(500).json({ error: "Erro ao criar ponto" });
    }
}