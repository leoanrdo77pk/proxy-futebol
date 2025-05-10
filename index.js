const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/", (req, res) => {
  const url = "https://futebol7k.com" + req.url;

  request(
    {
      url,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    },
    (error, response, body) => {
      if (error) return res.status(500).send("Erro ao carregar conteúdo");
      // Remove os headers bloqueadores
      res.removeHeader("X-Frame-Options");
      res.removeHeader("Content-Security-Policy");
      res.send(body);
    }
  );
});

app.listen(3000, () => console.log("Proxy ativo na porta 3000"));

