import fs from "fs/promises";

export async function readFilmes() {
    const data = await fs.readFile("./src/data/filmes.json", "utf-8");
    return JSON.parse(data);
}

export async function writeFilmes(filmes) {
    const data = JSON.stringify(filmes, null, 2);
    await fs.writeFile("./src/data/filmes.json", data, "utf-8");
}