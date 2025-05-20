// loginService.js
import loginRepository from "../repositories/loginRepository.js";

async function login(email, senha) {
  // Busca o funcionário com os dados informados.
  const user = await loginRepository.findByEmailAndSenha(email, senha);
  return user;
}

export default { login };
