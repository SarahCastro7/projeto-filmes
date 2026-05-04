import express from "express";
import { filmesService } from "../services/filmesServices.js";

const routeFilmes = express.Router();

// GET - listar todos os filmes
routeFilmes.get("/", (req, res) => {
    const filmes = filmesService.getAll();
    res.json(filmes);
});

// GET por ID
routeFilmes.get("/:id", (req, res) => {
    const { id } = req.params;

    // Validação: verifica se é número e se é positivo
    if (isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número positivo." });
    }

    const filme = filmesService.getById(id);

    if (!filme) {
        return res.status(404).json({ message: "Filme não encontrado." });
    }

    res.json(filme);
});

// POST - criar filme
routeFilmes.post("/", (req, res) => {
    const { nome, categoria } = req.body; // Extrai os dois campos

    if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
        return res.status(400).json({ message: "O campo nome é obrigatório." });
    }

    // Cria o objeto com os dados recebidos
    const novoFilme = filmesServicesService.create({
        nome: nome.trim(),
        categoria: categoria ? categoria.trim() : "Sem categoria"
    });

    res.status(201).json(novoFilme);
});

// PATCH - atualização parcial
routeFilmes.patch("/:id", (req, res) => {
    const { id } = req.params;
    const camposPermitidos = ["nome", "categoria"];
    const bodyKeys = Object.keys(req.body);

    // Valida se o body não está vazio
    if (bodyKeys.length === 0) {
        return res.status(400).json({ message: "Envie ao menos um campo para atualizar." });
    }

    // Opcional: Valida se enviaram campos que não existem (ex: "preco")
    const chavesInvalidas = bodyKeys.filter(key => !camposPermitidos.includes(key));
    if (chavesInvalidas.length > 0) {
        return res.status(400).json({ message: `Campos inválidos: ${chavesInvalidas.join(", ")}` });
    }

    const filmeAtualizado = filmesService.updatePatch(id, req.body);

    if (!filmeAtualizado) {
        return res.status(404).json({ message: "Filme não encontrado." });
    }

    res.json(filmeAtualizado);
});

// PUT - substituição completa
routeFilmes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, categoria } = req.body;

    // Valida se os campos obrigatórios vieram
    if (!nome || !categoria) {
        return res.status(400).json({ message: "Nome e categoria são obrigatórios no PUT." });
    }

    const filmeAtualizado = filmesService.updatePut(id, {
        nome: nome.trim(),
        categoria: categoria.trim()
    });

    if (!filmeAtualizado) {
        return res.status(404).json({ message: "Filme não encontrado." });
    }

    res.json(filmeAtualizado);
});

// DELETE
routeFilmes.delete("/:id", (req, res) => {
    const { id } = req.params;

    // Validação da estrutura do ID
    if (isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ message: "ID inválido para exclusão." });
    }

    const removido = filmesService.delete(id);

    // Mensagem de erro em JSON caso não encontre
    if (!removido) {
        return res.status(404).json({
            message: "Erro: Filme não encontrado para remoção."
        });
    }

    // Retorna mensagem confirmando a remoção (Status 200 para permitir corpo JSON)
    res.status(200).json({ message: "Filme removido com sucesso." });
});

export default routeFilmes;