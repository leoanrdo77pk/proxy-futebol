const express = require('express');
const app = express();
const axios = require('axios');

// Usando Express para criar um servidor que irá servir o conteúdo
app.get('/site', async (req, res) => {
  try {
    // Solicita o conteúdo do site externo
    const response = await axios.get('https://futebol7k.com');
    
    // Envia o conteúdo de volta para o navegador
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar conteúdo');
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
