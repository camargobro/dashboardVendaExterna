import { verRanking, verResumo } from "../services/dashboardServices.js";

export async function getDashboard(req, res) {
    try {
        const resumo = verResumo();
        res.status(200).json(resumo);
    } catch (error) {
        console.error("Erro ao obter resumo do dashboard:", error);
        res.status(500).json({ error: "Erro ao obter resumo do dashboard" });
    }
}

export function getRanking(req, res) {
    try {
        const data = verRanking();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Erro no ranking:", error);
        return res.status(500).json({ error: "Erro ao gerar ranking" });
    }
}