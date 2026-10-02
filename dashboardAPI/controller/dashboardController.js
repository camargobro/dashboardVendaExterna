import { getRanking, getResumo } from "../model/modelDashboard.js";
import ExcelJS from 'exceljs';

export async function verDashboard(req, res) {
    try {
        const resumo = await getResumo(req.empresaId);
        res.status(200).json(resumo);
    } catch (error) {
        console.error("Erro ao obter resumo do dashboard:", error);
        res.status(500).json({ error: "Erro ao obter resumo do dashboard" });
    }
}

export async function verRanking(req, res) {
    try {
        const data = await getRanking(req.empresaId);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Erro no ranking:", error);
        return res.status(500).json({ error: "Erro ao gerar ranking" });
    }
}

export async function baixarRankingXlsx(req, res) {
    try {
        const data = await getRanking(req.empresaId);
        const rows = data.ordenado || [];

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Ranking');

        sheet.columns = [
            { header: 'Nome', key: 'nome', width: 32 },
            { header: 'Endereco', key: 'endereco', width: 40 },
            { header: 'Bairro', key: 'bairro', width: 20 },
            { header: 'Cidade', key: 'cidade', width: 20 },
            { header: 'Total Visitas', key: 'totalVisitas', width: 15 },
            { header: 'Total Vendas', key: 'totalVendas', width: 15 },
            { header: 'Total Leads', key: 'totalLeads', width: 15 },
            { header: 'Media Vendas', key: 'mediaVendas', width: 15 },
            { header: 'Media Leads', key: 'mediaLeads', width: 15 }
        ];

        rows.forEach(r => {
            sheet.addRow({
                nome: r.nome,
                endereco: r.endereco,
                bairro: r.bairro,
                cidade: r.cidade,
                totalVisitas: r.totalVisitas,
                totalVendas: r.totalVendas,
                totalLeads: r.totalLeads,
                mediaVendas: Number(r.mediaVendas.toFixed(2)),
                mediaLeads: Number(r.mediaLeads.toFixed(2))
            });
        });

        // Style header row bold
        sheet.getRow(1).font = { bold: true };

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="ranking.xlsx"');
        return res.send(Buffer.from(buffer));
    } catch (error) {
        console.error('Erro ao gerar XLSX do ranking:', error);
        return res.status(500).json({ error: 'Erro ao gerar XLSX do ranking' });
    }
}