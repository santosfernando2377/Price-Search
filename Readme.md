# Price Research
O projeto Price Research é uma API voltada para inteligência negócios, realizando pesquisas automatizadas de produtos em grandes plataformas como <b>Google Shopping</b> ou <b>Mercado Livre</b> com intuíto de realizar uma análise precificação de produtos.

### <b>Estrutura do Projeto</b>
Foi utilizado as seguintes tecnologias no projeto:

  
    ├── models                   
    ├── routes                    
    ├── utils                     
    ├── index.js                    
    ├── .env

### <b>Bibliotecas</b>
- Express
- Puppeteer
- Morgan-Body
- Moongose
- Bcrypt
- JWT - Json Web Token

### <b>Como executar o projeto?</b>

Para executar o projeto é necessário ter instalado em seu computador

- NodeJS
- MongoDB
- Postman

Para baixar o projeto clique faça um `git clone` do projeto. Após fazer o clone do projeto acesse a pasta do mesmo e execute o comando no <b>prompt de comando</b> ou no <b>bash</b> `npm install`, quando conluído a instalação execute o comando `npm run dev`. O node irá subir uma API REST para realizar a pesquisa.

### <b>Testando API REST</b>

- <b>Cadastro de Usuário</b>
```
var axios = require('axios');
var data = JSON.stringify({
  "Name": "Fernando Soares",
  "Email": "santosfernando2377@gmail.com",
  "Password": "Fernando34778929"
});

var config = {
  method: 'post',
  url: 'http://localhost:3000/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
- <b>Geração de Token</b>
```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:3000/login?Email=santosfernando2377@gmail.com&Password=Fernando34778929',
  headers: { 
    'Content-Type': 'application/json'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
- <b>Pesquisa de Produtos</b>
```
var axios = require('axios');
var data = JSON.stringify({
  "produto": "macbook",
  "id": "6336af7493c29cf8e743c6d8"
});

var config = {
  method: 'get',
  url: 'http://localhost:3000/google',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzZhZjc0OTNjMjljZjhlNzQzYzZkOCIsImlhdCI6MTY2NDUyOTExN30.xVQeylU4l5mHOFEad-asYrjiSG-F4LEPSdel_3mHXrU'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```