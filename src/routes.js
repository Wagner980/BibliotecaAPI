import { Router } from "express";
import alunoController from "./controllers/alunoController.js";
import livroController from "./controllers/livroController.js";
import funcionarioController from "./controllers/funcionarioController.js";
import emprestimoController from "./controllers/emprestimoController.js";
import autorController from "./controllers/autorController.js";
import categoriaController from "./controllers/categoriaController.js";
import loginController from "./controllers/loginController.js";
import turmaController from "./controllers/turmaController.js";

const router = Router();

// Página inicial
router.get("/", (req, res) => {
  res.status(200).send("Página HOME");
});

// Rotas para alunos (chave primária: matricula)
router.post("/alunos", alunoController.Inserir);
router.get("/alunos", alunoController.Listar);
router.put("/alunos/:matricula", alunoController.Editar);
router.delete("/alunos/:matricula", alunoController.Excluir);

// Rotas para livros
router.post("/livros", livroController.Inserir);
router.get("/livros", livroController.Listar);
router.put("/livros/:id", livroController.Editar);
router.delete("/livros/:id", livroController.Excluir);

// Rotas para funcionários
router.post("/funcionarios", funcionarioController.Inserir);
router.get("/funcionarios", funcionarioController.Listar);
router.put("/funcionarios/:id", funcionarioController.Editar);
router.delete("/funcionarios/:id", funcionarioController.Excluir);

// Rotas para empréstimos
router.post("/emprestimos", emprestimoController.Inserir);
router.get("/emprestimos", emprestimoController.Listar);
router.put("/emprestimos/:id", emprestimoController.Editar);
router.delete("/emprestimos/:id", emprestimoController.Excluir);

// Rotas para autores
router.post("/autores", autorController.Inserir);
router.get("/autores", autorController.Listar);
router.put("/autores/:id", autorController.Editar);
router.delete("/autores/:id", autorController.Excluir);


// Rotas para categorias
router.post("/categorias", categoriaController.Inserir);
router.get("/categorias", categoriaController.Listar);
router.put("/categorias/:id", categoriaController.Editar);
router.delete("/categorias/:id", categoriaController.Excluir);

router.post("/turmas", turmaController.Inserir);
router.get("/turmas", turmaController.Listar);
router.put("/turmas/:id", turmaController.Editar);
router.delete("/turmas/:id", turmaController.Excluir);

router.post("/login", loginController.login);

export default router;
