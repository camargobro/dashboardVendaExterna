import jwt from "jsonwebtoken";
import "dotenv/config";

export function autenticar(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: "Token não informado"
            });
        }

        const [tipo, token] = authHeader.split(" ");

        if (tipo !== "Bearer" || !token) {
            return res.status(401).json({
                error: "Formato do token inválido"
            });
        }

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Token inválido ou expirado"
        });
    }
}

export function somenteAdmin(req, res, next) {
    if (String(req.usuario?.tipo || '').toLowerCase() !== 'admin') {
        return res.status(403).json({
            error: "Acesso restrito a administradores"
        });
    }

    next();
}