import { Usuario } from "../model/modelUsuario.js";


export async function verificaUsuario(nome, email, senha) {
    if (!nome || !email || !senha) {
            return false
        }
        return true
}

export async function verificaDuplicado(usuario) {
    const duplicado = await Usuario.findOne({
        $or: [
            { nome: usuario.nome },
            { email: usuario.email }
        ]
    });
    return duplicado;
}

export async function loginUsuario(email) {
    return await Usuario.findOne({ email });
}
