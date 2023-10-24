import { NextApiRequest, NextApiResponse } from "next";
import { CadastroRequisicao } from "../../types/CadastroRequisicao";
import { UsuarioModel } from "../../models/UsuarioModel";
import conectarMongoDb from "@/middlewares/conectarMongoDb";


const cadastro = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const usuario = req.body as CadastroRequisicao;
    
    if (!usuario.nome || usuario.nome.length < 2) {
      return res.status(405).json({Erro: 'Nome inválido'});
    }

    if (!usuario.email || !usuario.email.includes('@')) {
      return res.status(405).json({Erro: 'Email inválido'});
    }

    if (!usuario.senha || usuario.senha.length < 8) {
      return res.status(405).json({Erro: 'Senha inválida'});
    }

      await UsuarioModel.create(usuario);
      return res.status(200).json({Erro: 'Usuário cadastrado com sucesso'});

  }
  return res.status(405).json({Erro: 'Método inválido'});
}

export default conectarMongoDb(cadastro);