import fs from "fs/promises";

async function readFilmes() {
    const data = await fs.readFile("./filmes.json", "utf-8");
    const filmes = JSON.parse(data);
    return filmes
}

async function writeFilmes (filmes) {
    const data = JSON.stringify(filmes, null, 2);
    await fs.writeFilmes("./filmes.json", data, "utf-8");
}
