const https = require('https');

module.exports = async (req, res) => {
  try {
    console.log("Iniciando requisição...");
    const path = req.url === '/' ? '' : req.url;
    const targetUrl = 'https://futebol7k.com' + path;

    https.get(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Referer': 'https://futebol7k.com',
      }
    }, (resp) => {
      let data = '';
      console.log("Conexão com o site bem-sucedida, processando resposta...");

      resp.on('data', chunk => data += chunk);
      resp.on('end', () => {
        try {
          console.log("Processando o HTML...");
          
          // Reescreve links para manter no domínio Vercel
          data = data
            .replace(/https:\/\/futebol7k\.com\//g, '/')
            .replace(/href='\/([^']+)'/g, "href='/$1'")
            .replace(/href="\/([^"]+)"/g, 'href="/$1"')
            .replace(/action="\/([^"]+)"/g, 'action="/$1"')
            .replace(/<base[^>]*>/gi, '');

          // Remover ou alterar o título e o ícone
          data = data
            .replace(/<title>[^<]*<\/title>/, '<title>Meu Site</title>')  // Coloque aqui o título desejado
            .replace(/<link[^>]*rel=["']icon["'][^>]*>/gi, '');  // Remove o ícone

          // Adicionar Modal para o aplicativo
          let finalHtml;
          if (data.includes('</body>')) {
            finalHtml = data.replace('</body>', `
<div id="custom-modal">
  <div id="modal-content">
    <p>Baixe nosso aplicativo</p>
    <button id="close-modal">Fechar</button>
  </div>
</div>
<div id="custom-footer">
  <a href="https://8xbet86.com/" target="_blank">
    <img src="https://i.imgur.com/Fen20UR.gif" style="width:100%;max-height:100px;object-fit:contain;cursor:pointer;" alt="Banner" />
  </a>
</div>
<style>
  /* Modal Styling */
  #custom-modal {
    display: none; /* Modal inicialmente escondido */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 150, 136, 0.8); /* Cor #009688 com transparência */
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    text-align: center;
  }

  #modal-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  #modal-content p {
    font-size: 24px;
    font-weight: bold;
  }

  #close-modal {
    background-color: #009688;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }

  #close-modal:hover {
    background-color: #00796b;
  }

  #custom-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: transparent;
    text-align: center;
    z-index: 9999;
  }

  body { padding-bottom: 120px !important; }
</style>
<script>
  // Exibe o modal ao carregar a página
  window.onload = function() {
    document.getElementById('custom-modal').style.display = 'flex';
  };

  // Fecha o modal ao clicar no botão de fechar
  document.getElementById('close-modal').onclick = function() {
    document.getElementById('custom-modal').style.display = 'none';
  };
</script>
</body>`);
          } else {
            // Se não tiver </body>, adiciona manualmente
            finalHtml = `
${data}
<div id="custom-modal">
  <div id="modal-content">
    <p>Baixe nosso aplicativo</p>
    <button id="close-modal">Fechar</button>
  </div>
</div>
<div id="custom-footer">
  <a href="https://8xbet86.com/" target="_blank">
    <img src="https://i.imgur.com/Fen20UR.gif" style="width:100%;max-height:100px;object-fit:contain;cursor:pointer;" alt="Banner" />
  </a>
</div>
<style>
  /* Modal Styling */
  #custom-modal {
    display: none; /* Modal inicialmente escondido */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 150, 136, 0.8); /* Cor #009688 com transparência */
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    text-align: center;
  }

  #modal-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  #modal-content p {
    font-size: 24px;
    font-weight: bold;
  }

  #close-modal {
    background-color: #009688;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }

  #close-modal:hover {
    background-color: #00796b;
  }

  #custom-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: transparent;
    text-align: center;
    z-index: 9999;
  }

  body { padding-bottom: 120px !important; }
</style>
<script>
  // Exibe o modal ao carregar a página
  window.onload = function() {
    document.getElementById('custom-modal').style.display = 'flex';
  };

  // Fecha o modal ao clicar no botão de fechar
  document.getElementById('close-modal').onclick = function() {
    document.getElementById('custom-modal').style.display = 'none';
  };
</script>
</body>`;
          }

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', resp.headers['content-type'] || 'text/html');
          res.statusCode = 200;
          res.end(finalHtml);
        } catch (err) {
          console.error("Erro ao processar o HTML:", err);
          res.statusCode = 500;
          res.end("Erro ao processar o conteúdo.");
        }
      });
    }).on("error", (err) => {
      console.error("Erro ao fazer requisição HTTPS:", err);
      res.statusCode = 500;
      res.end("Erro ao carregar conteúdo.");
    });
  } catch (err) {
    console.error("Erro geral:", err);
    res.statusCode = 500;
    res.end("Erro interno.");
  }
};
