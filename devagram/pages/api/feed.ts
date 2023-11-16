import type { NextApiRequest, NextApiResponse} from 'next';
import { RespostaPadrao } from '@/types/RespostaPadrao';
import validarTokenJwt from '@/middlewares/validarJwt';
import conectarMongoDb from '@/middlewares/conectarMongoDb';
import { PublicacaoModel } from '@/models/PublicacaoModel';
import { UsuarioModel } from '@/models/UsuarioModel';

const feed = async (req: NextApiRequest, res: NextApiResponse<RespostaPadrao | any>) => {
   
    try {
        if (req.method === 'GET') {
            if (req?.query?.id){
                const usuario = await UsuarioModel.findById(req?.query?.id);
                if (!usuario) {
                    return res.status(400).json({Erro: 'Usuário não encontrado'});
                }
            
                const publicacoes = await PublicacaoModel
                    .find({idUsuario: usuario._id})
                    .sort({data: -1});
                
                return res.status(200).json(publicacoes);

            }
            
            return res.status(400).json({Erro: 'Não há consulta'});

        }

        return res.status(405).json({Erro: 'Método informado não é válido'});

    } catch (error) {
        console.log(error);
        return res.status(400).json({Erro: 'Não foi possível validar o token de acesso'});
    }

}
 
export default validarTokenJwt(conectarMongoDb(feed));