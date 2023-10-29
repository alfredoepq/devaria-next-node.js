import { NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

const validarTokenJwt = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { MINHA_CHAVE_JWT } = process.env;

        if (!MINHA_CHAVE_JWT) {
            return res.status(500).json({Erro: 'Chave de segurança não informada'});
        }
    
        if (!req.headers) {
            return res.status(401).json({Erro: 'Não é possível validar o token de acesso'});
        }
    
        if (req.method !== 'OPTIONS') {
            const authorization = req.headers['authorization'];
            if (!authorization) {
                return res.status(401).json({Erro: 'Não é possível validar o token de acesso'});
            }
    
            const token = authorization.substring(7);
            if (!token) {
                return res.status(401).json({Erro: 'Não é possível validar o token de acesso'});
            }
    
            const decoded = jwt.verify(token, MINHA_CHAVE_JWT) as JwtPayload;
    
            if (!decoded) {
                return res.status(401).json({Erro: 'Não é possível validar o token de acesso'});
            }
    
            if (!req.query) {
                req.query = {};
            }
    
            req.query.userId = decoded._id;
        }
    
        return handler(req, res);
            
    } catch (error) {
        console.log(error);
        res.status(401).json({Erro: 'Não foi possível validar o token de acesso'})
    }

    
    return res.status(405).json({Erro: 'Método inválido'});
}

export default validarTokenJwt;