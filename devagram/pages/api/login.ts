import { NextApiRequest, NextApiResponse } from "next";
import conectarMongoDb from '../../models/conectarMongoDb'

const login = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body;

    if (login === 'admin@123' && senha==='senha@123') {
      return res.status(200).json({Erro: 'Usuário logado com sucesso'});
    }
    return res.status(405).json({Erro: 'Senha e login não conferem'});
  }
  return res.status(405).json({Erro: 'Método inválido'});
}

export default conectarMongoDb(login);