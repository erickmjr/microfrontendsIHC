class Item {
    id;
    title;
    price;
    qtd = 0;

    constructor(id, title, price, qtd) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.qtd = qtd;
    }
}

let items = [];

export function render(container) {
    container.innerHTML = `
        <div id="cart-icon">
            <img src="http://localhost:3002/images/cart.png" alt="Carrinho">
        </div>
        <div id="cart-modal">
            <div>
                <span id="close-cart-modal">&times;</span>
                <div id="cart-modal-content"></div>
            </div>
        </div>
    `;

    function updateCartModal() {
        const modalContent = document.getElementById("cart-modal-content");
        if (items.length === 0) {
            modalContent.innerHTML = `
                <h2>Carrinho</h2>
                <p>Nenhum item no carrinho.</p>
            `;
        } else {
            let valorTotal = 0;

            const lista = items.map(produto => {
                valorTotal += produto.price * produto.qtd;
                return `
                    <li class='item__carrinho'><div>${produto.title} - R$${Number(produto.price).toFixed(2)} <b>x ${produto.qtd}</b></div> <button type="button"><img src="http://localhost:3002/images/trash.svg"></img></button>
                    </li>
                `;
            })

            modalContent.innerHTML = `
                <h2>Carrinho</h2>
                <ul>
                    ${lista}
                </ul>
                <p><b>Valor total:</b> ${valorTotal.toFixed(2)}</p>
            `;
        }
    }

    document.getElementById("cart-icon").addEventListener("click", () => {
        document.getElementById("cart-modal").style.display = "block";
        updateCartModal();
    });

    document.getElementById("close-cart-modal").addEventListener("click", () => {
        document.getElementById("cart-modal").style.display = "none";
    });

    window.addEventListener("add-to-cart", (e) => {
        let existeNaLista = items.some(produto => produto.id == e.detail.id)
        if (existeNaLista) {
            items.map(produto => {
                if (produto.id == e.detail.id) {
                    produto.qtd++;
                }
            }
        )
    } else {
        const newProduct = new Item(e.detail.id, e.detail.title, e.detail.price, 1)
        items.push(newProduct);
    }
        updateCartModal();
    });
}