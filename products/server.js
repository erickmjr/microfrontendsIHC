const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname)));

app.get('/api/products', async (req, res) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        if (!response.ok) {
            console.error('Erro ao buscar da API:', response.status, await response.text());
            return res.status(500).json({ error: 'Erro ao buscar produtos da API externa' });
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Microfrontend de produtos rodando em http://localhost:${PORT}`);
});