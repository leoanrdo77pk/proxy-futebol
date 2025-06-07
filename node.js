
// server.js (proxy básico)
const express = require('express');
const request = require('request');
const app = express();

app.get('/stream', (req, res) => {
  const streamUrl = 'https://sinalpublico.vercel.app/play/dtv.html?id=sbt';
  req.pipe(request(streamUrl)).pipe(res);
});

app.listen(3000, () => console.log('Proxy rodando na porta 3000'));
