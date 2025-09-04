let items = [];

export function render(container) {
    function updateCart() {
        if (items.length === 0) {
            container.innerHTML = `
                <h2>Carrinho</h2>
                <p>Nenhum item no carrinho.</p>
            `;
        } else {
            container.innerHTML = `
                <h2>Carrinho</h2>
                <ul>
                    ${items.map(item => `<li>${item.title} - R$${item.price}</li>`).join("")}
                </ul>
            `;
        }
    }

    updateCart();

    window.addEventListener("add-to-cart", (e) => {
        items.push(e.detail);
        updateCart();
    });
}