import { connection } from './connection.js';


export async function inserirSala(nome, usuarioId) {
    const comando = 
    `INSERT INTO sala (nome, usuario_id) VALUES (?, ?)`
    let [registros] = await connection.query(comando, [nome, usuarioId]);
    return registros.insertId;
}


export async function buscarSalaPorId(salaId) {
   const comando =
   `SELECT * FROM sala WHERE id = ?`

   let [registros] = await connection.query(comando, [salaId]);
   return registros;
}

