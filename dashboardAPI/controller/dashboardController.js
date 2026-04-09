import { getRanking, getResumo } from "../model/modelDashboard.js";

export async function verDashboard(req, res) {
    try {
        const resumo = await getResumo();
        res.status(200).json(resumo);
    } catch (error) {
        console.error("Erro ao obter resumo do dashboard:", error);
        res.status(500).json({ error: "Erro ao obter resumo do dashboard" });
    }
}

export async function verRanking(req, res) {
    try {
        const data = await getRanking();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Erro no ranking:", error);
        return res.status(500).json({ error: "Erro ao gerar ranking" });
    }
}