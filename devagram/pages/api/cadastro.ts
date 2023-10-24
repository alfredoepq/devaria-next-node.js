import { NextApiRequest, NextApiResponse } from "next";
import { CadastroRequisicao } from "../../types/CadastroRequisicao";
import { UsuarioModel } from "../../models/UsuarioModel";
import conectarMongoDb from "@/middlewares/conectarMongoDb";
import md5 from "md5";

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

    const usuariosComMesmoEmail = await UsuarioModel.find({email: usuario.email});

    if (usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0) {
      return res.status(401).json({Erro: 'Já existe uma conta com o email inforamdo'});
    }
      const usuarioASerSalvo = {
        nome: usuario.nome,
        email: usuario.email,
        senha: md5(usuario.senha)
      }

      await UsuarioModel.create(usuarioASerSalvo);
      return res.status(200).json({Erro: 'Usuário cadastrado com sucesso'});

     

  }
  return res.status(405).json({Erro: 'Método inválido'});
}

export default conectarMongoDb(cadastro);