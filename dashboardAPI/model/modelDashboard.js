import { Acoes } from './modelAcao.js';
import { Pontos } from './modelPonto.js';

async function getDadosEmpresa(empresaId) {
    const [acoes, pontos] = await Promise.all([
        Acoes.find({ empresaId }),
        Pontos.find({ empresaId })
    ]);
    const pontosIds = new Set(pontos.map(ponto => String(ponto._id)));

    return {
        acoes: acoes.filter(acao => pontosIds.has(String(acao.pontoId))),
        pontos
    };
}

export async function getResumo(empresaId) {
    try {
        const { acoes } = await getDadosEmpresa(empresaId);

        const totalAcoes = acoes.length;
        const totalVendas = acoes.reduce((acc, a) => acc + a.vendas, 0);
        const totalLeads = acoes.reduce((acc, a) => acc + a.leads, 0);

        return {
            totalAcoes,
            totalVendas,
            totalLeads
        };
    } catch (error) {
        console.error('Erro ao buscar resumo:', error);
        throw error;
    }
}

export async function getRanking(empresaId) {
    try {
        const { acoes, pontos } = await getDadosEmpresa(empresaId);

        const agrupado = {};

        // Agrupar ações por ponto
        acoes.forEach(a => {
            const pontoIdStr = a.pontoId.toString();

            if (!agrupado[pontoIdStr]) {
                agrupado[pontoIdStr] = {
                    totalVisitas: 0,
                    totalVendas: 0,
                    totalLeads: 0
                };
            }

            agrupado[pontoIdStr].totalVisitas++;
            agrupado[pontoIdStr].totalVendas += a.vendas;
            agrupado[pontoIdStr].totalLeads += a.leads;
        });

        // Transformar em array + calcular médias
        const resultado = Object.entries(agrupado).map(([pontoId, dados]) => {

            const ponto = pontos.find(
                p => p._id.toString() === pontoId
            );

            const mediaVendas =
                dados.totalVisitas === 0
                    ? 0
                    : dados.totalVendas / dados.totalVisitas;

            const mediaLeads =
                dados.totalVisitas === 0
                    ? 0
                    : dados.totalLeads / dados.totalVisitas;

            return {
                pontoId,

                nome: ponto?.nome || 'Desconhecido',

                telefone: ponto?.telefone || '',

                endereco: ponto?.endereco || 'Endereço não informado',

                bairro: ponto?.bairro || '',

                cidade: ponto?.cidade || '',

                ...dados,

                mediaVendas,
                mediaLeads
            };
        });

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

    } catch (error) {
        console.error('Erro ao buscar ranking:', error);
        throw error;
    }
}