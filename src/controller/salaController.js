import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaRepo from '../repository/salaRepository.js';
import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/sala', autenticador, async (req, resp) => {
    let usuarioId = req.user.id;
    let nome = req.body.nome;

    let salaId = await salaRepo.inserirSala(nome, usuarioId);
    let salaPermissao = await salaPermissaoRepo.inserirPermissao(salaId, usuarioId, true)

    resp.send(salaPermissao);
});


export default endpoints;