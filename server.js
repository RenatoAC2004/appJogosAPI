const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const config = require('./config')

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const banco = new Sequelize(config.development);

const Jogo = require('./Models/jogos')(banco, Sequelize);

banco.sync().then(() => {
    console.log("Modelo sincronizado com o banco de dados.")
});

//rotas
app.get('/games', async (req, res) => {
    const jogos = await Jogo.findAll();
    res.json(jogos);
});

app.post('/games', async (req, res) => {
    const {title, thumbnail, status, short_description} = req.body;
    const jogo = await Jogo.create({title, thumbnail, status, short_description});
    res.json(jogo);
});

app.put('/games', async (req, res) => {
    const {id} = req.params;
    const {title, thumbnail, status, short_description} = req.body;
    
    await Jogo.update({title, thumbnail, status, short_description}, {where: {id} });
    const jogo = await Jogo.findByPk(id);

    res.json(jogo);
});

app.delete('/games/:id', async (req, res) => {
    const {id} = req.params;

    await Jogo.destroy({where: {id} });
    res.json({message: 'Produto deletado com sucesso!'})
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});