// loginRepository.js
import db from "../db.js"; // Certifique-se de que 'db.js' exporta a conexão ou pool configurado

async function findByEmailAndSenha(email, senha) {
  // Consulta na tabela 'funcionario' usando os campos 'email' e 'senha'
  const query = "SELECT * FROM funcionario WHERE email = ? AND senha = ?";
  const [rows] = await db.execute(query, [email, senha]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}

export default { findByEmailAndSenha };
