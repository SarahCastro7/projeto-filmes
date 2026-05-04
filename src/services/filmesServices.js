//aqui fica toda a logica de negócio, ou seja, tudo o que tem a ver com o banco de dados
const filmes = [
    { "id": 1, "nome": "Minha Mãe é Uma Peça", "categoria": "Comedia" },
    { "id": 2, "nome": "Homem-Aranha: Longe de Casa", "categoria": "Ação/Ficção científica" },
    { "id": 3, "nome": "Devoradores de Estrelas", "categoria": "Ficção científica/Aventura" },
    { "id": 4, "nome": "Se Não Fosse Você", "categoria": "Comedia/Romance" },
    { "id": 5, "nome": "Ze Colmeia", "categoria": "animação infantil" },
    { "id": 6, "nome": "Scooby Doo", "categoria": " Mistério/Animação infantil" },
    { "id": 7, "nome": "Náufrago", "categoria": "Aventura/Ação" },
    { "id": 8, "nome": "Alvin e os Esquilos", "categoria": " Infantil/Comédia" },
    { "id": 9, "nome": "Os Smurfs", "categoria": " Infantil/Comédia" },
    { "id": 10, "nome": "Hop: Rebelde sem Páscoa", "categoria": " Infantil/Comédia" },
    { "id": 11, "nome": "O Diabo Veste Prada", "categoria": "Comédia/Drama" },
    { "id": 12, "nome": "Legalmente Loira", "categoria": "Comedia/Romance" },
    { "id": 13, "nome": "Chicago", "categoria": "Musical/Crime" },
    { "id": 14, "nome": "Hairspray: Em Busca da Fama", "categoria": "Musical/Comédia" },
    { "id": 15, "nome": "Atração Mortal", "categoria": " Comédia/Crime" },
    { "id": 16, "nome": "Bottoms", "categoria": "Comédia" },
    { "id": 17, "nome": "Eu Vi o Brilho da TV", "categoria": "Drama/Terror Psicológico" },
    { "id": 18, "nome": "10 Coisas que Eu Odeio em Você", "categoria": "Comedia/Romance" },
    { "id": 19, "nome": "Grande Menina, Pequena Mulher", "categoria": "Comédia/Drama" },
    { "id": 20, "nome": "As Crônicas de Spiderwick", "categoria": "Infantil/Aventura" },
    { "id": 21, "nome": "O Diário da Princesa", "categoria": "Infantil/Comédia" },
    { "id": 22, "nome": "Abracadabra", "categoria": "Infantil/Comédia" }
]

export const filmesService = {
    getAll: () => filmes,

    // Usar Number(id) garante que a comparação funcione mesmo se o ID vier como string da URL
    getById: (id) => filmes.find(f => f.id === Number(id)),

    create: (dados) => {
        const novo = {
            id: Date.now(), // Mantendo como número para consistência
            ...dados        // Espalha nome, categoria, etc.
        };
        filmes.push(novo);
        return novo;
    },

    updatePatch: (id, dados) => {
        const filme = filmes.find(f => f.id === Number(id));
        if (!filme) return null;

        // Mescla as propriedades existentes com as novas
        Object.assign(filme, dados);
        return filme;
    },

    updatePut: (id, dados) => {
        const index = filmes.findIndex(f => f.id === Number(id));
        if (index === -1) return null;

        // No PUT, o objeto antigo é "substituído", mas preservamos o ID
        const atualizado = { id: Number(id), ...dados };
        filmes[index] = atualizado;
        return atualizado;
    },

    delete: (id) => {
        const index = filmes.findIndex(f => f.id === Number(id));
        if (index === -1) return false;

        filmes.splice(index, 1);
        return true;
    },
};
