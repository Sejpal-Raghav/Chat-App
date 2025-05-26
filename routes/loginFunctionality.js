export function handleLogin(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const data = new URLSearchParams(body);
    const username = data.get('username');

    if (username) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: username }));
    } else {
      res.writeHead(400);
      res.end('Invalid login');
    }
  });
}
