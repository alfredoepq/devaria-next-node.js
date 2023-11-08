import { NextApiResponse } from "next";
import conectarMongoDb from "@/middlewares/conectarMongoDb";
import validarJwt from "@/middlewares/validarJwt";
import nc from 'next-connect';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic'
import { RespostaPadrao } from "@/types/RespostaPadrao";
import { PublicacaoModel } from "@/models/PublicacaoModel";
import { UsuarioModel } from "@/models/UsuarioModel";

  const handler = nc()
    .use(upload.single('file'))
    .post(async (req: any, res: NextApiResponse<RespostaPadrao>) => {

      try {
        const { userId } = req.query;

        const usuario = await UsuarioModel.findById(userId);
          if (!usuario) {
            return res.status(405).json({Erro: 'Usuário não encontrado'});
          }

          if (!req || !req.body) {
            return res.status(405).json({Erro: 'Parâmetros de entrada inválidos'});
          }

          const { descricao } = req.body;
          if (!descricao || descricao.length < 2) {
            return res.status(405).json({Erro: 'Descrição não é válida'});
          }

          if (!req.file || !req.file.originalname) {
            return res.status(405).json({Erro: 'Não há arquivo para envio'});
          }

        const image = await uploadImagemCosmic(req);

        const publicacao = {
          idUsuario: usuario._id,
          descricao,
          foto: image.media.url,
          data: new Date()
        }

        await PublicacaoModel.create(publicacao);

        return res.status(200).json({Mensagem: 'Publicação criada com sucesso'});
        }
  
      catch (error) {
        console.log(error);
        return res.status(200).json({Mensagem: 'Erro ao cadastrar publicação'});
      }
    })
        
    export const config = {
      api: {
        bodyParser: false
      }
    }
    
export default validarJwt(conectarMongoDb(handler));