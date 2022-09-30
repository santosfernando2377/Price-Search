import express from "express";
import User from "../../models/users/index.js";

const router = express.Router();


router.get('/', async (req, res) => {

    const {Email, Password} = req.body

    if (!Email || Email == '') {
        res.status(406).json({
            'Message':'Campo Name é obrigatório!'
        })
    }

    if (!Password || Password == '') {
        res.status(406).json({
            'Message':'Campo Name é obrigatório!'
        })
    }

    try {
        
        const user = await User.findOne({ Email: Email, Password: Password })

        if (Boolean(user) == true) {

            console.log(user.Active)
            
            if (user.Active == true) {
                return res.status(200).json({
                    'Message':'Usuário Autenticado com Sucesso!'
                });    
            } else {
                return res.status(401).json({
                    'Message':'Usuário Desativado!'
                });
            }
               
        } else {
            return res.status(401).json({
                'Message':'Usuário ou Senha Incorreto!'
            });
        }

    } catch (error) {
        res.status(500).json({
            'Error': error
        }) 
    }


})


router.post('/', async (req, res) => {

    const { Name, Email, Password } = req.body

    if (!Name || Name == '') {
        return res.status(406).json({
            'Message':'Campo Name é obrigatório!'
        });
    }

    if (!Email || Email == '') {
        return res.status(406).json({
            'Message':'Campo Name é obrigatório!'
        });
    }

    if (!Password || Password == '') {
        return res.status(406).json({
            'Message':'Campo Name é obrigatório!'
        });
    }

    let Active = true;

    const tenant = {
        Name,
        Email,
        Password,
        Active
    }

    try {

        const consulta_usuario_banco = await User.findOne({ Email: Email });

        if (Boolean(consulta_usuario_banco) == true) {
            return res.status(200).json({
                'Message':'Usuário Já Cadastrado!'
            });
        } else {
            await User.create(tenant);
            return res.status(200).json({
                'Message':'Usuário Cadastrado com Sucesso!'
            });   
        }
    } catch (error) {
        res.status(500).json({
            'Error': error
        });
    }


})

export default router;