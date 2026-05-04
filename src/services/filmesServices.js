//aqui fica toda a logica de negócio, ou seja, tudo o que tem a ver com o banco de dados

class FilmesServices {
async function getAllFilmes() {
    const filmes = await readFilmes();
    return filmes;
}
async function getFilmesById(id) {
    const filmes = await readFilmes();
    const filme = filmes.finf(item => item.id === Number(id));
    return filme;
}

async function createFilme(nome, categoria) {
    const filmes = await readFilmes();
    const newFilme = {
        id:filmes.length > 0 ? filmes[filmes.length -1].id + 1 : 1, nome: nome, categoria: categoria
    };

    filmes.push(newFilme);
    await writeFilmes(filmes);
    return newFilme;
}
}

export const filmesServices = new FilmesServices();