const express = require('express');
const { sign } = require('jsonwebtoken');
const multer = require('multer');
const { ApplicationError } = require('./error/ApplicationError');
const uploadConfig = require('./upload/uploadConfig');
const { validaToken } = require('./validaToken');

const app = express();
const uploadMidleware = multer(uploadConfig);

app.use(express.json());
app.use('/imagens', express.static(uploadConfig.directory));

function monitoraRequisicoes(request, response, next) {
    const { method, url, params, body, query } = request;

    const texto = `[${method} - ${url} - params: ${JSON.stringify(params)} 
        - body: ${JSON.stringify(body)} - query: ${JSON.stringify(query)}]`;
    
    console.log(texto);

    return next();
}

app.use(monitoraRequisicoes);

app.get('/disciplinas', (request, response) => {
    const query = request.query;

    return response.json(query)
});

app.post('/disciplinas', uploadMidleware.single('avatar'), (request, response) => {
    const body = request.body;
    
    return response.json(body);
});

//Utilizando o token para validação
app.put('/disciplinas/:id', validaToken, (request, response) => {
    const { id } = request.params;

    if (id != 'tecnologia') {
       throw new ç('Disciplina não encontrada.', 404);
    }

    return response.json({id});
});

app.delete('/disciplinas', (request, response) => {
    return response.json({
        message: 'Nessa rota devo remover uma disciplina'
    });
});

/**
 * Rotas de autenticação
 */
app.post('/autenticacao', (request, response) => {
    const { email, senha } = request.body;

    //Validações quanto a e-mail e senha

    const idUsuario = "XPTO";   
        const token = sign({
            //Não incluir informações sensiveis (email, senha, ...)
            //O comum é incluir permissões, etc...
        }, 'minha-chave-secreta', {
            subject: idUsuario,
            expiresIn: '1d'
        });
    
 
    
    return response.json({token});
});

/**
 * Midleware para tratamento de erros
 */
app.use((error, request, response, next) => {
    if (error instanceof ApplicationError) {
        return response.status(error.httpStatusCode).json({
            message: error.mensagem
        });
    }

    console.log(error);
    return response.status(500).json({
        message: "Não foi possível executar sua requisição. Tente novamente"
    });
})

app.listen(3000);