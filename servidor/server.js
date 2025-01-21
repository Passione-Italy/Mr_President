import express from 'express';
import cors from 'cors';

const app = express();


app.use(express.json());

app.use(cors());

let GamesList = [{id: 1, nome:"Hollow Knight", dlc:"Trupe Grimm", valor: 5.00, lancamento: "12/12/2012", avaliacao: 5, requisitos: "Intel Core i5, 4gb ram", desenvolvedora: "Team Cherry"}];


const respostaErro = (res, status, mensagem) => {
    return res.status(status).json({ erro: mensagem });
};



app.post('/GamesList', (req, res) => {
    const { nome, dlc, valor, lancamento, avaliacao, requisitos, desenvolvedora } = req.body;
    
    if (!nome || !dlc || !valor || !lancamento || !avaliacao || !requisitos || !desenvolvedora) {
        return res.status(400).json({ erro: 'Nome, dlc, valor, lançamento, avaliação, requisitos e desenvolvedora são obrigatórios' });

    }
    const novoGame = { id: GamesList.length + 1, nome, dlc, valor, lancamento, avaliacao, requisitos, desenvolvedora };
    GamesList.push(novoGame);
    
    res.status(201).json(novoGame);
});




app.get('/GamesList', (req, res) => {
    res.status(200).json(GamesList);
});


app.get('/GamesList/:id', (req, res) => {
    const { id } = req.params;
    const Game = GamesList.find(u => u.id === parseInt(id));

    if (!Game) {
        return respostaErro(res, 404, 'Game não encontrado');
    }

    res.status(200).json(Game);
});


app.put('/GamesList/:id', (req, res) => {
    const { id } = req.params;

    const { nome, dlc, valor, lancamento, avaliacao, requisitos, desenvolvedora } = req.body;



    const Game = GamesList.find(u => u.id === parseInt(id));

    if (!Game) {
        return respostaErro(res, 404, 'Game não encontrado');
    }



    Game.nome = nome || Game.nome;
    Game.dlc = dlc || Game.dlc;
    Game.valor = valor || Game.valor;
    Game.lancamento = lancamento || Game.lancamento;
    Game.avaliacao = avaliacao || Game.avaliacao;
    Game.requisitos = requisitos || Game.requisitos;
    Game.desenvolvedora = desenvolvedora || Game.desenvolvedora

    


    res.status(200).json(Game);
});


app.delete('/GamesList/:id', (req, res) => {
    const { id } = req.params;
    const index = GamesList.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        return respostaErro(res, 404, 'Game não encontrado');
    }

    GamesList.splice(index, 1);
    res.status(204).send();  
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

