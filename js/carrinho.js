let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const user = JSON.parse(localStorage.getItem('usuario'));
if (!user) {
  localStorage.setItem('acao', 'finalizarCarrinho');
  window.location.href = 'login.html';
  return;
}
// Se logado, continuar para WhatsApp:


function atualizarCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador-carrinho");
    if (!lista || !total || !contador) return;

    lista.innerHTML = "";
    let soma = 0;

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.nome}
            <span class="text-danger">R$ ${item.preco.toFixed(2)}</span>
        `;
        lista.appendChild(li);
        soma += item.preco;
    });

    total.textContent = soma.toFixed(2);
    contador.textContent = carrinho.length;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(produto) {
    carrinho.push(produto);
    atualizarCarrinho();
}

function esvaziarCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();

    const btnFinalizar = document.getElementById("finalizar");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            const texto = encodeURIComponent(
                `Olá! Gostaria de comprar:\n\n${carrinho.map(p => p.nome).join("\n")}\n\nTotal: R$ ${carrinho.reduce((s, p) => s + p.preco, 0).toFixed(2)}`
            );
            window.open(`https://wa.me/5599999999999?text=${texto}`, "_blank");
        });
    }
});
