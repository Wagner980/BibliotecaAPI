// loginController.js
import loginService from "../services/loginService.js";

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const user = await loginService.login(email, senha);
    if (!user) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }
    // Retorne apenas dados relevantes, omitindo a senha
    return res.status(200).json({
      id: user.id,
      email: user.email,
      nome: user.nome, // ou outro campo que desejar retornar
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor.", detalhes: error.message });
  }
}

export default { login };
