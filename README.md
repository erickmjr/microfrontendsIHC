# Estrutura

- **host/**  
  Interface principal da loja, responsável por importar e renderizar os microfrontends de produtos e carrinho.
- **products/**  
  Microfrontend de produtos, exibe lista de produtos e dispara eventos para adicionar itens ao carrinho.
- **cart/**  
  Microfrontend do carrinho, escuta eventos e exibe os itens adicionados.

## Como rodar

1. **Instale as dependências**
   ```bash
   cd products
   npm install
   cd ../cart
   npm install
   cd ../host
   npm install
   ```

2. **Inicie os servidores dos microfrontends**
   
   # Em um terminal na pasta products
   node server.js

   # Em outro terminal na pasta cart
   node server.js
   

3. **Sirva o host**
   npx serve .

4. **Acesse a aplicação**
   - Host: `http://localhost:3000` (ou porta do seu servidor estático)
   - Microfrontends:  
     - Produtos: `http://localhost:3001`  
     - Carrinho: `http://localhost:3002`

## Comunicação entre microfrontends

- O microfrontend de produtos dispara um evento `add-to-cart` ao clicar em "Adicionar ao carrinho".
- O microfrontend do carrinho escuta esse evento e atualiza a lista de itens.

## Tecnologias

- **JavaScript ES Modules**
- **Express.js** (para servir arquivos e proxy de API)
- **SCSS/CSS** para estilos
- **Fake Store API** para dados de produtos

## Observações

- Certifique-se que as portas 3001 e 3002 estejam livres.
- O proxy de produtos resolve problemas de CORS ao consumir a Fake Store API.
- O host importa os microfrontends via URLs dos servidores Express.