let items = [];

export function render(container) {
    container.innerHTML = `
        <div id="cart-icon">
            <img src="/cart/images/cart.png" alt="Carrinho">
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

            const lista = Object.entries(contagem).map(([title, info]) => {
                return `<li>${title} - R$${Number(info.price).toFixed(2)} x ${info.qtd}</li>`;
            }).join("");

            modalContent.innerHTML = `
                <h2>Carrinho</h2>
                <ul>
                    ${lista}
                </ul>
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