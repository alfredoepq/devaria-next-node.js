import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const conectarMongoDb = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
    
        const { STRING_CONEXAO_MONGODB } = process.env;
        if (!STRING_CONEXAO_MONGODB) {
            return res.status(500).json({Erro: 'String de conexão não informada'});
        }
    
    
        await mongoose.connect(STRING_CONEXAO_MONGODB);
        console.log('Conectado com sucesso');
    } catch (Erro) {
        console.log('Falha ao tentar conexão com banco de dados');
    }
   
    return handler(req, res);
}

export default conectarMongoDb;
