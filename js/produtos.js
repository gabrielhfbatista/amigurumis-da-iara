// Este arquivo contém a lógica para manipulação de produtos e carrinho de compras
// incluindo adição de produtos ao carrinho, criação de cards de produtos e carregamento de
// produtos.js

function adicionarCarrinho(produto) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    localStorage.setItem("acao", "adicionarCarrinho");
    localStorage.setItem("produtoTemporario", JSON.stringify(produto));
    window.location.href = "login.html";
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  if (typeof atualizarCarrinho === 'function') {
    atualizarCarrinho();
  }
}


function criarCardProduto(produto) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";
  col.innerHTML = `
    <div class="card h-100 shadow-sm border-0">
      <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
      <div class="card-body text-center">
        <h5 class="card-title">${produto.nome}</h5>
        <p class="card-text fw-bold text-danger">R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn btn-outline-primary" onclick='adicionarCarrinho(${JSON.stringify(produto)})'>Adicionar ao Carrinho</button>
      </div>
    </div>`;
  return col;
}

function carregarProdutosPorCategoria() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  const categorias = {
    santinhas: document.getElementById("produtos-santinhas"),
    pet: document.getElementById("produtos-pet"),
    kids: document.getElementById("produtos-kids"),
    chaveiros: document.getElementById("produtos-chaveiros"),
    diversos: document.getElementById("produtos-diversos")
  };

  produtos.forEach(produto => {
    const destino = categorias[produto.categoria];
    if (destino) {
      destino.appendChild(criarCardProduto(produto));
    }
  });
}

document.addEventListener("DOMContentLoaded", carregarProdutosPorCategoria);
// Login com Google básico (Firebase)
function inicializarFirebase() {
  const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_PROJETO_ID",
    storageBucket: "SEU_BUCKET.appspot.com",
    messagingSenderId: "SEU_MESSAGING_ID",
    appId: "SUA_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);

  const provider = new firebase.auth.GoogleAuthProvider();

  document.getElementById("login-google")?.addEventListener("click", () => {
    firebase.auth().signInWithPopup(provider).then(result => {
      const user = result.user;
      alert(`Bem-vindo(a), ${user.displayName}`);
    }).catch(error => {
      alert("Erro no login: " + error.message);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("login-google")) {
    inicializarFirebase();
  }
});
