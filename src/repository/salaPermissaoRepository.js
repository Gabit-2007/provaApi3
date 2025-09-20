import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando =
    `INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) 
    VALUES (?, ?, ?)`
    let [registros] = await connection.query(comando, [salaId, usuarioId, aprovado]);
    return registros.insertId;
}


export async function aprovarPermissao(salaId, usuario1Id) {
    const comando =
    `UPDATE salaPermissao SET aprovado = TRUE 
    WHERE sala_id = ? AND usuario_id = ?`

    let [registros] = await connection.query(comando, [salaId, usuario1Id]);
}


export async function verificarPermissaoSala(salaId, usuarioId) {
    const comando =
        `SELECT id FROM salaPermissao WHERE sala_id = ? 
        AND usuario_id = ? AND aprovado = TRUE`
    let [registros] = await connection.query(comando, [salaId, usuarioId]);
    return registros;
}