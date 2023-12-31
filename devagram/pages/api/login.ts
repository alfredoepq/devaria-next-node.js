import { NextApiRequest, NextApiResponse } from "next";
import conectarMongoDb from '../../middlewares/conectarMongoDb'
import { RespostaPadrao } from "@/types/RespostaPadrao";
import { DadosToken } from '../../types/DadosToken';
import { UsuarioModel } from "@/models/UsuarioModel";
import md5 from "md5";
import jwt from 'jsonwebtoken';

const login = async (req: NextApiRequest, res: NextApiResponse<RespostaPadrao | DadosToken>) => {

  
  const { MINHA_CHAVE_JWT} = process.env;
  
  if (!MINHA_CHAVE_JWT) {
    res.status(500).json({Mensagem: 'Chave de segurança não informada'});
  }
  
  if (req.method === 'POST') {
    const { login, senha } = req.body;

  const usuariosEncontrados = await UsuarioModel.find({email: login, senha: md5(senha)});
  if (usuariosEncontrados && usuariosEncontrados.length > 0) {
    const usuarioEncontrado = usuariosEncontrados[0];

    const token = jwt.sign({_id: usuarioEncontrado._id}, MINHA_CHAVE_JWT);

    return res.status(200).json({
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      token
    });
  }

    return res.status(405).json({Erro: 'Senha e login não conferem'});
  }
  return res.status(405).json({Erro: 'Método inválido'});
}

export default conectarMongoDb(login);