import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morganBody from 'morgan-body';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Rotas
 */

import auth from './routes/auth/index.js';
import googleShopping from './routes/googleShopping/index.js';
import mercadolivre from './routes/mercadoLivre/index.js';
import search from './routes/search/index.js';

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

morganBody(app);

app.use('/login', auth);
app.use('/google', googleShopping);
app.use('/mercadolivre', mercadolivre);
app.use ('/pesquisa', search);

app.get('/', (req, res) => {
    res.json({
        message: {
            Status: 'Funcionando'
        }
    })
});

mongoose.connect(`mongodb://localhost:27017/BigProducts?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectado ao banco de dados!');
    app.listen(3000);    
})
.catch((error) => {
    console.log(error);
})