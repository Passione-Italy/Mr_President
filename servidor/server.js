const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let usuarios = [];

app.post('/usuarios', (req, res) => {
    const { nome, dlc, valor, lancamento, avaliacao, requisitos, desenvolvedora } = req.body;
    
    if (!nome || !dlc || !valor || !lancamento || !avaliacao || !requisitos || !desenvolvedora) {
        return res.status(400).json({ erro: 'Nome, dlc, valor, lançamento são obrigatórios' });
    }

    const novoUsuario = { id: usuarios.length + 1, nome, dlc, valor, lancamento, avaliacao, requisitos, desenvolvedora };
    usuarios.push(novoUsuario);
    
    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));
    
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    res.status(200).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, dlc, valor, lancamento, avaliacao, requisitos, desenvolvedora } = req.body;
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    usuario.nome = nome || usuario.nome;
    usuario.dlc = dlc || usuario.dlc;
    usuario.valor = valor || usuario.valor;
    usuario.lancamento = lancamento || usuario.lancamento;
    usuario.avaliacao = avaliacao || usuario.avaliacao;
    usuario.requisitos = requisitos || usuario.requisitos;
    usuario.desenvolvedora = desenvolvedora || usuario.desenvolvedora

    
    res.status(200).json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    usuarios.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
