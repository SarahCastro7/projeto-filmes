import fs from "fs/promises";

export async function readFilmes() {
    const data = await fs.readFile("./src/data/filmes.json", "utf-8");
    const filmes = JSON.parse(data);
    return filmes
}

export async function writeFilmes (filmes) {
    const data = JSON.stringify(filmes, null, 2);
    await fs.writeFilmes("./src/data/filmes.json", data, "utf-8");
}
