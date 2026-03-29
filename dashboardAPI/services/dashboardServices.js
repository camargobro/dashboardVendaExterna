import dbAcoes from "../dbAcoes.js";
import db from "../db.js";

export function verResumo() {
    const totalAcoes = dbAcoes.length;

    const totalVendas = dbAcoes.reduce((acc, a) => acc + a.vendas, 0);
    const totalLeads = dbAcoes.reduce((acc, a) => acc + a.leads, 0);

    return {
        totalAcoes,
        totalVendas,
        totalLeads
    };
}

export function verRanking() {

    const agrupado = {};

    // 🔹 Agrupar ações por ponto
    dbAcoes.forEach(a => {
        if (!agrupado[a.pontoId]) {
            agrupado[a.pontoId] = {
                totalVisitas: 0,
                totalVendas: 0,
                totalLeads: 0
            };
        }

        agrupado[a.pontoId].totalVisitas++;
        agrupado[a.pontoId].totalVendas += a.vendas;
        agrupado[a.pontoId].totalLeads += a.leads;
    });

    // 🔹 Transformar em array + calcular médias
    const resultado = Object.entries(agrupado).map(([pontoId, dados]) => {

        const ponto = db.find(p => (p._id) === (pontoId));

        const mediaVendas = dados.totalVisitas === 0
            ? 0
            : dados.totalVendas / dados.totalVisitas;

        const mediaLeads = dados.totalVisitas === 0
            ? 0
            : dados.totalLeads / dados.totalVisitas;

        return {
            pontoId,
            nome: ponto?.nome || "Desconhecido",
            ...dados,
            mediaVendas,
            mediaLeads
        };
    });

    // 🔥 Rankings

    const melhorVendas = [...resultado].sort(
        (a, b) => b.mediaVendas - a.mediaVendas
    )[0];

    const melhorLeads = [...resultado].sort(
        (a, b) => b.mediaLeads - a.mediaLeads
    )[0];

    const piorPonto = [...resultado].sort(
        (a, b) => a.mediaVendas - b.mediaVendas
    )[0];

    const ordenado = resultado.sort(
    (a, b) => b.mediaVendas - a.mediaVendas
    );
    return {
        melhorVendas,
        melhorLeads,
        piorPonto,
        ordenado
    };
}