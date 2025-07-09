<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Futebol Ao Vivo grátis</title>
  <style>
    html, body {
      margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden;
      background: transparent;
    }
    iframe {
      border: none;
      width: 100%;
      height: 100vh;
      max-width: 100%;
      display: block;
    }
    .overlay-full {
      position: fixed;
      bottom: 0; /* pode ajustar se quiser em cima */
      left: 0;
      width: 100%;
      z-index: 9999;
      pointer-events: auto; /* permite clicar na imagem */
    }
    .overlay-full img {
      width: 100%;
      height: auto;
      display: block;
    }
    .close-btn {
      position: absolute;
      top: 5px;
      right: 10px;
      background: transparent;
      color: white;
      border: none;
      font-size: 30px;
      cursor: pointer;
      z-index: 10000;
      font-weight: bold;
      text-shadow: 0 0 5px black;
    }
    .overlay-wrapper {
      position: relative;
      width: 100%;
    }
  </style>
</head>
<body>

  <iframe
    src="/site"
    allow="encrypted-media"
    allowfullscreen
    referrerpolicy="no-referrer"
  ></iframe>

  <div class="overlay-full" id="overlayFull">
    <div class="overlay-wrapper">
      <button class="close-btn" onclick="document.getElementById('overlayFull').style.display='none'">&times;</button>
      <a href="https://8xbet86.com/" target="_blank" rel="noopener noreferrer">
        <img src="https://i.imgur.com/Fen20UR.gif" alt="Banner sem fundo">
      </a>
    </div>
  </div>

</body>
</html>
