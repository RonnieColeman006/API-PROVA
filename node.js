const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8000;

app.use(express.json()); 


function registrarLog(nomeAluno) {
  const idUnico = uuidv4();
  const dataHora = new Date().toISOString().replace('T', ' ').split('.')[0];
  const mensagem = `${idUnico} - ${dataHora} - ${nomeAluno}\n`;

  fs.appendFileSync('logs.txt', mensagem, 'utf8');
  return idUnico;
}


app.post('/logs', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'O campo "nome" é obrigatório.' });
  }

  try {
    const id = registrarLog(nome);
    res.status(201).json({
      id,
      mensagem: 'Log registrado com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao registrar log:', error);
    res.status(500).json({ erro: 'Erro interno ao registrar o log.' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
