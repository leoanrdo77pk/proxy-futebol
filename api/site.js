import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://futebol7k.com';

  try {
    // Busca o conteúdo do site externo
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Accept': 'text/html',
      }
    });

    // Obtém o HTML da resposta
    let html = await response.text();

    // Opcional: aqui você pode reescrever URLs dentro do HTML para apontar para o seu domínio,
    // para que recursos como scripts, imagens e estilos também passem pelo proxy.

    // Ajuste simples para reescrever links internos para o proxy:
    html = html.replace(/https:\/\/futebol7k\.com/g, '');

    // Define cabeçalho para HTML
    res.setHeader('Content-Type', 'text/html');

    // Remove header de proteção para iframe (se existir)
    res.removeHeader?.('x-frame-options');
    res.removeHeader?.('content-security-policy');

    res.status(200).send(html);

  } catch (error) {
    res.status(500).send('Erro no proxy: ' + error.message);
  }
}
