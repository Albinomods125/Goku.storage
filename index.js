const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página de aluguel
app.get('/aluguel.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'aluguel.html'));
});

// Rota para a página de contas
app.get('/contas.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contas.html'));
});

// Rota para a página de jogo
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'jogo.html'));
});

// Rota para retornar os dados do JSON
app.get('/dados', (req, res) => {
  const filePath = path.join(__dirname, 'dados.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler dados.json:', err.message);
      return res.status(500).json({ error: 'Erro ao carregar dados.' });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error('Erro ao interpretar JSON:', parseErr.message);
      res.status(500).json({ error: 'Erro ao interpretar dados.' });
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});