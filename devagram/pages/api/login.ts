import { NextApiRequest, NextApiResponse } from "next";
import conectarMongoDb from '../../middlewares/conectarMongoDb'
import { RespostaPadrao } from "@/types/RespostaPadrao";
import { UsuarioModel } from "@/models/UsuarioModel";
import md5 from "md5";

const login = async (req: NextApiRequest, res: NextApiResponse<RespostaPadrao>) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body;

    const usuariosEncontrados = await UsuarioModel.find({email: login, senha: md5(senha)});
    if (usuariosEncontrados && usuariosEncontrados.length > 0) {
      const usuarioEncontrado = usuariosEncontrados[0];

      res.status(201).json({Mensagem: `O usuário logado é o ${usuarioEncontrado.nome}`})
    }

    return res.status(405).json({Erro: 'Senha e login não conferem'});
  }
  return res.status(405).json({Erro: 'Método inválido'});
}

export default conectarMongoDb(login);