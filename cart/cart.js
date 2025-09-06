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
            const contagem = items.reduce((acc, item) => {
                if (!acc[item.title]) {
                    acc[item.title] = { qtd: 0, price: item.price };
                }
                acc[item.title].qtd++;
                return acc;
            }, {});

            let valorTotal = 0;
            const lista = Object.entries(contagem).map(([title, info]) => {
                valorTotal += info.price * info.qtd;
                return `<li class='item__carrinho'><div>${title} - R$${Number(info.price).toFixed(2)} <b>x ${info.qtd}</b></div> <button type="button"><img src="http://localhost:3002/images/trash.svg"></img></button>
                </li>`;
            }).join("");


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
        items.push(e.detail);
        
        updateCartModal();
    });
}