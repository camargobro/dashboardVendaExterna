
import { getUsuarios, postUsuario, deleteUsuario } from '../model/modelUsuario.js';
import { verificaDuplicado, verificaUsuario, loginUsuario } from '../regrasNegocios/regraNegociosUsuarios.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import 'dotenv/config';
const saltRounds = 10

export async function buscarUsuarios(req, res) {
    try {
        const usuarios = await getUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao obter usuarios:", error);
        res.status(500).json({ error: "Erro ao obter usuarios" });
    }
}

export async function criarUsuario(req, res) {
    try {
        const { nome, tipo, email, senha } = req.body;

        const duplicado = await verificaDuplicado({ nome, email });
        if (duplicado) {
            return res.status(400).json({ error: "Usuário já existe, tente novamente com outros dados" })
        }

        const camposValidos = await verificaUsuario(nome, tipo, email, senha);

        if (!camposValidos) {
            return res.status(400).json({
                error: "Algum campo está faltando"
            });
        }
        const senhaHash = await bcrypt.hash(senha, saltRounds)
        const novoUsuario = await postUsuario({ nome, tipo, email, senha: senhaHash });
        if (!novoUsuario) {
            return res.status(400).json({ error: "Erro ao criar usuario" });
        }

        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.error("Erro ao criar usuario:", error);
        return res.status(500).json({ error: "Erro ao criar usuario" });
    }
}

export async function apagarUsuario(req, res) {
    try {
        const id = req.params.id;
        const usuarioDeletado = await deleteUsuario(id);

        if (!usuarioDeletado) {
            res.status(404).json({ error: "Usuario não encontrado" });
        } else {
            res.status(200).json({ message: "Usuario deletado com sucesso" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuario" });
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await loginUsuario(email);

        if (!usuario) {
            return res.status(401).json({
                error: "Email ou senha incorretos"
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                error: "Email ou senha incorretos"
            });
        }


        const token = jwt.sign(
            {
                id: usuario._id,
                tipo: usuario.tipo,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn:  "6h"
            }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso",
            usuario,
            token
        });

    } catch (error) {
        console.error("Erro ao realizar login:", error);

        return res.status(500).json({
            error: "Erro ao realizar login"
        });
    }
}