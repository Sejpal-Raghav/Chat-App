import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleLogin } from './routes/loginFunctionality.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/chatroom', handleLogin);
app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatPage.html'));
})

app.listen(PORT, ()=>{
  console.log("Server running!");
});