import fs from "fs/promises";

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
