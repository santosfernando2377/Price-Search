import express from 'express';
import cors from 'cors';
import morganBody from 'morgan-body';
import googleShopping from './routes/googleShopping/index.js';
import mercadolivre from './routes/mercadoLivre/index.js';

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

morganBody(app);

app.use('/google', googleShopping);
app.use('/mercadolivre', mercadolivre);

app.get('/', (req, res) => {
    res.json({
        message: {
            Status: 'Funcionando'
        }
    })
});

app.listen(3000);