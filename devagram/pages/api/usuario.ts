import validarTokenJwt from "@/middlewares/validarJwt";
import { NextApiRequest, NextApiResponse } from "next";

const usuario = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(201).json({Mensagem: 'Usuário autenticado com sucesso'});
}

export default validarTokenJwt(usuario);