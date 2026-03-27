
import db from '../db.js';

export function verificaIdPonto(pontoId) {
    return db.some(p => p._id === pontoId);
}