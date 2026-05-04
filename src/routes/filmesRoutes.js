import express from "express";
import { filmesService } from "../services/filmes.service.js";

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
    const { nome } = req.body;

    // Validação de conteúdo: verifica se é string e se não está vazia
    if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
        return res.status(400).json({ 
            message: "O campo nome deve ser um texto válido e não pode estar vazio." 
        });
    }

    const novoFilme = filmesService.create({ nome: nome.trim() });

    res.status(201).json(novoFilme);
});

// PATCH - atualização parcial
routeFilmes.patch("/:id", (req, res) => {
    const { id } = req.params;
    const bodyKeys = Object.keys(req.body);

    // Validação da estrutura do ID (header/params)
    if (isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ message: "Estrutura do ID inválida." });
    }

    // Valida se chegou APENAS o campo "nome" no body
    if (bodyKeys.length !== 1 || !req.body.nome) {
        return res.status(400).json({ 
            message: "Para atualização parcial, envie apenas o campo 'nome'." 
        });
    }

    const { nome } = req.body;

    const filmeAtualizado = filmesService.updatePatch(id, nome);

    if (!filmeAtualizado) {
        return res.status(404).json({
            message: "Filme não encontrado, não foi possível atualizar.",
        });
    }

    res.json(filmeAtualizado);
});

// PUT - substituição completa
routeFilmes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    // Validação da estrutura do ID
    if (isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ message: "Estrutura do ID inválida." });
    }

    // Validação do campo obrigatório
    if (!nome) {
        return res.status(400).json({
            message: "Dados insuficientes, o campo nome é obrigatório.",
        });
    }

    // Validação extra do conteúdo (tipo e conteúdo real)
    if (typeof nome !== "string" || nome.trim().length === 0) {
        return res.status(400).json({
            message: "O conteúdo do campo nome deve ser um texto válido.",
        });
    }

    const filmeAtualizado = filmesService.updatePut(id, { nome: nome.trim() });

    if (!filmeAtualizado) {
        return res.status(404).json({
            message: "Filme não encontrado.",
        });
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