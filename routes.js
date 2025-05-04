import { Router } from "express";
import alunoController from "./controllers/alunoController.js";
import livroController from "./controllers/livroController.js";
import funcionarioController from "./controllers/funcionarioController.js";
import emprestimoController from "./controllers/emprestimoController.js";

const router = Router();

// Página inicial
router.get("/", (req, res) => {
    res.status(200).send("Página HOME");
});

// Rotas para alunos
router.post("/alunos", alunoController.Inserir);
router.get("/alunos", alunoController.Listar);
router.put("/alunos/:id", alunoController.Editar);
router.delete("/alunos/:id", alunoController.Excluir);

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

export default router;
