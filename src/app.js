import fs from "fs/promises";

import fs from "fs/promises";
async function readFilmes() {
    const data = await fs.readFile("./filmes.json", "utf-8");
    const filmes = JSON.parse(data);
    return filmes
}

async function writeFilmes(filmes) {
    const data = JSON.stringify(filmes, null, 2);
    await fs.writeFilmes("./filmes.json", data, "utf-8");
}

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
        id: filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1, nome: nome, categoria: categoria
    };

    filmes.push(newFilme);
    await writeFilmes(filmes);
    return newFilme;
}

async function updateFilmes(id, novoNome, novaCategoria) {
    const filmes = await readFilmes();
    const index = filmes.findIndex(item => item.id === Number(id));

    if (index === -1) {
        return null;
    }

    filmes[index].nome = novoNome;

    filmes[index].categoria = novaCategoria;

    await writeFilmes(filmes);

    return filmes[index];

}

async function deleteFilme(id) {
    const filmes = await readFilmes();

    const index = filmes.findIndex(item => item.id === Number(id));

    if (index === -1) {
        return false
    }

    filmes.splice(index, 1);

    await writeFilmes(filmes)

    return true;
}


//!!! Área de Retorno !!!
const filmes = await getAllFilmes();
console.log(filmes);

const filme = await getFilmesById(3);
console.log(filme);

const newFilme = await createFilme("Narciso", "Drama");
console.log(newFilme);

const editedFilme = await updateFilmes(11, "O Diabo Veste Prada 2");
console.log(editedFilme);

const deleted = await deleteFilme(8);
console.log(deleted)

