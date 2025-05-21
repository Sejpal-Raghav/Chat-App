import http from 'http'
import url from 'url'
import path from 'path';
import fs from 'fs'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
    let filename = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    const ext = path.extname(filename);
    let contentType = 'text/html';

    switch(ext){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'text/json'
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    fs.readFile(filename, (err, content)=>{
            if(err){
            res.writeHead('404', {'Content-Type': 'text/html'})
            return res.end('404 Not Found')
            }
            else{
            res.writeHead('200', {'Content-Type': contentType})
            res.write(content);
            res.end();
            }
        })
    }).listen(5000);