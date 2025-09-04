const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); 

app.use(express.static(path.join(__dirname))); 

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/cart.js", (req, res) => {
  res.sendFile(path.join(__dirname, "cart.js"));
});

const PORT = 3002; 
app.listen(PORT, () => {
    console.log(`Microfrontend do carrinho rodando em http://localhost:${PORT}`);
});