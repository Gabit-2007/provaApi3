import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let usuarioId = req.user.id;
    let salaId = req.params.sala;

    let salaPermissao = await salaPermissaoRepo.inserirPermissao(salaId, usuarioId, false);

    resp.send(salaPermissao);
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let usuarioId = req.user.id;
    let salaId = req.params.sala;
    let usuario1Id = req.params.usuario;

    let verifica = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioId);

    if(verifica.length === 0) {
        resp.status(401).send({ erro: 'Você não pode aprovar usuários.' });
    }

    else{
        let aprovado = await salaPermissaoRepo.aprovarPermissao(salaId, usuario1Id);

        resp.send(aprovado);
    }
  
});



export default endpoints;