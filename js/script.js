
function carregarProdutosDoStorage() {
  return JSON.parse(localStorage.getItem('produtos')) || [];
}
// Verifica se o localStorage já tem produtos, se não, adiciona alguns  
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
  function mostrarProdutos() {
    const produtos = carregarProdutosDoStorage();
    const container = document.getElementById('lista-produtos');
    container.innerHTML = ''; // limpa antes de carregar
  
    produtos.forEach((p, index) => {
      const div = document.createElement('div');
      div.className = 'col-md-4 mb-4';
      div.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <img src="${p.imagem}" class="card-img-top" alt="${p.nome}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text fw-bold text-danger">R$ ${p.preco.toFixed(2)}</p>
            <button class="btn btn-outline-primary" onclick="adicionarCarrinho(${index})">Adicionar ao Carrinho</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }
  
  function atualizarCarrinho() {
    const lista = document.getElementById('itens-carrinho');
    const total = document.getElementById('total');
    lista.innerHTML = '';
    let soma = 0;
  
    carrinho.forEach((item, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}
        <button onclick="removerItem(${i})">❌</button>
      `;
      lista.appendChild(li);
      soma += item.preco * item.quantidade;
    });
  
    total.textContent = soma.toFixed(2);
  
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
      const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
      contador.innerText = totalItens;
    }
  }

  function adicionarCarrinho(index) {
    const produto = produtos[index];
    const itemExistente = carrinho.find(item => item.nome === produto.nome);
  
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
  
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    salvarCarrinho();
    atualizarCarrinho();
  }  
  
  function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    salvarCarrinho();
    atualizarCarrinho();
  }

  document.getElementById('finalizar').addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  
    if (!usuario) {
      localStorage.setItem('acao', 'finalizarCarrinho');
      window.location.href = 'login.html';
      return;
    }
  
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    const texto = encodeURIComponent(`Olá! Quero finalizar a compra dos seguintes produtos:\n\n${carrinho.map(i => i.nome).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`);
    window.open(`https://wa.me/5599999999999?text=${texto}`, '_blank');
  });
  
  mostrarProdutos();
  atualizarCarrinho();
  