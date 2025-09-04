export function render(container) {
    container.innerHTML = "<section class='produtos'><h2>Produtos</h2><ul id='product-list'>Carregando...</ul></section>";

    fetch("http://localhost:3001/api/products")
    .then(res => res.json())
    .then(data => {
        const list = data.map(item => 
            `<li class="itemsList">
                <div class='itemsList__item'>
                    <div class="itemsList__item__container">
                        <div class='item__image'><img src='${item.image}'></div>
                        <div class="item__infos">
                            <div class='item__infos__title'>${item.title}</div>
                            <div class='item__infos__price'>R$ ${item.price.toFixed(2)}</div>
                        </div>
                    </div>
                    <button data-id="${item.id}" data-title="${item.title}" data-price="${item.price}">Adicionar ao carrinho</button>
                </div>
            </li>`
        ).join("");
        document.getElementById("product-list").innerHTML = list;

        document.querySelectorAll("#product-list button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const { id, title, price } = e.target.dataset;
                window.dispatchEvent(new CustomEvent("add-to-cart", {
                    detail: { id, title, price }
                }));
            });
        });
    })
}