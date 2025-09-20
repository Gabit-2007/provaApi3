import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as chatRepo from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    let usuarioId = req.user.id;
    let salaId = req.params.sala;
    let mensagem = req.body.mensagem

    let verifica = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioId);
    
        if(verifica.length === 0) {
            resp.status(401).send({ erro: 'Você não pode mandar mensagens nesse canal.' });
        }
    
        else{
            let chat = await chatRepo.inserirMensagem(usuarioId, salaId, mensagem);
    
            resp.send(chat);
        }
});


endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    let usuarioId = req.user.id;
    let salaId = req.params.sala;

    let verifica = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioId);
    
        if(verifica.length === 0) {
            resp.status(401).send({ erro: 'Você não pode listar as mensagens do canal' });
        }
    
        else{
            let chat = await chatRepo.listarMensagensPorSala(salaId);
    
            resp.send(chat);
        }
});


export default endpoints;