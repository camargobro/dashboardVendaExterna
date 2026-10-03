import { Usuario } from "../model/modelUsuario.js";


export async function verificaUsuario(nome, cnpj, email, senha) {
    if (!nome || !cnpj || cnpj.length !== 14 || !email || !senha) {
            return false
        }
        return true
}

export async function verificaDuplicado(usuario) {
    const duplicado = await Usuario.findOne({
        $or: [
            { nome: usuario.nome },
            { email: usuario.email },
            { cnpj: usuario.cnpj }
        ]
    });
    return duplicado;
}

export async function loginUsuario(email) {
    return await Usuario.findOne({ email });
}
