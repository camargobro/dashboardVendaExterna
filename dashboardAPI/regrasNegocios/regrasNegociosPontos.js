
import db from '../db.js';
export function pontoDuplicado(ponto) {
    return db.some(p => p.nome === ponto.nome && p.endereco === ponto.endereco);
}