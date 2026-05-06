import { readFilmes, writeFilmes } from "../config/db.js";

class FilmesService {
    async getAll() {
        const filmes = await readFilmes();
        return filmes || [];
    }

    async getById(id) {
        const filmes = await readFilmes();
        return (filmes || []).find(item => item.id === Number(id)) || null;
    }

    async createFilme(nome, categoria) {
        const filmes = await readFilmes() || [];
        const newFilme = {
            id: filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1,
            nome,
            categoria
        };

        filmes.push(newFilme);
        await writeFilmes(filmes);
        return newFilme;
    }
//criar o put
    async updateFilme(id, novoNome, novaCategoria) {
        const filmes = await readFilmes() || [];
        const index = filmes.findIndex(item => item.id === Number(id));
        if (index === -1) return null;

        if (novoNome !== undefined) filmes[index].nome = novoNome;
        if (novaCategoria !== undefined) filmes[index].categoria = novaCategoria;

        await writeFilmes(filmes);
        return filmes[index];
    }

    async deleteFilme(id) {
        const filmes = await readFilmes() || [];
        const index = filmes.findIndex(item => item.id === Number(id));
        if (index === -1) return false;

        filmes.splice(index, 1);
        await writeFilmes(filmes);
        return true;
    }


}

export const filmesService = new FilmesService();
