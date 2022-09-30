import express from 'express';
import mercadoLivre from '../../utils/mercadoLivre.js';
import Product from '../../models/products/index.js';
import User from '../../models/users/index.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

function validaToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(" ")[1]

   if (!token) {
      res.status(401).json({
         'Mensagem':'Acesso Negado'
      })
   }

   try {
      
      const secret = process.env.SECRET_KEY
      jwt.verify(token, secret)
      next()

   } catch (error) {
      res.status(401).json({
         'Mensagem':'Token Inválido'
      })
   }
}

router.get('/', validaToken, async (req, res) => {

    const { produto, id } = req.body
 
    const user = await User.findById(id,'-Password');
    
    if(!user) {
      return res.status(404).json({
         'Message':'Usuário não encontrado!'
      })
    }

    if(!produto || produto == '') {
      return res.status(406).json({
         'Message':'Por favor definir o produto de busca'
      });
    }
    
    try {

       const resultado_pesquisa_mercardo_livre = await mercadoLivre(produto);

       await Product.create(resultado_pesquisa_mercardo_livre);
       
       res.status(200).json({
            'Product': resultado_pesquisa_mercardo_livre
       });

    } catch (error) {
       res.status(500).json({
        'Error': error
       });
    }
    
})

export default router;