const firebaseConfig = {
    apiKey: "AIzaSyCbfZcTbglWjndh6u3vVtDj0UfB2MA59I0",
    authDomain: "amigurumisdaiara.firebaseapp.com",
    projectId: "amigurumisdaiara",
    storageBucket: "amigurumisdaiara.firebasestorage.app",
    messagingSenderId: "96852364496",
    appId: "1:96852364496:web:83c61877709a41d477a2d5",
    measurementId: "G-HBQ0X26L7D"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  

// LOGIN COM GOOGLE
function loginComGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            localStorage.setItem('usuario', JSON.stringify({
                nome: user.displayName,
                email: user.email
            }));
            redirecionarAposLogin();
        })
        .catch(error => alert("Erro no login Google: " + error.message));
}

// LOGIN COM E-MAIL E SENHA
function loginComEmailSenha(email, senha) {
    auth.signInWithEmailAndPassword(email, senha)
        .then(result => {
            const user = result.user;
            localStorage.setItem('usuario', JSON.stringify({
                nome: user.email.split('@')[0],
                email: user.email
            }));
            redirecionarAposLogin();
        })
        .catch(error => alert("Erro no login: " + error.message));
}

// REGISTRAR NOVO USUÁRIO
function cadastrarEmailSenha(email, senha) {
    auth.createUserWithEmailAndPassword(email, senha)
        .then(result => {
            alert("Usuário criado com sucesso!");
            loginComEmailSenha(email, senha);
        })
        .catch(error => alert("Erro no cadastro: " + error.message));
}
// CASO O USUÁRIO TENHA REALIZADO ALGUMA AÇÃO ANTES DE LOGAR
// (como adicionar um produto ao carrinho ou finalizar a compra), redireciona para
function redirecionarAposLogin() {
    const acao = localStorage.getItem('acao');

    if (acao === 'adicionarCarrinho') {
        const produtoTemporario = JSON.parse(localStorage.getItem('produtoTemporario'));
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produtoTemporario);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        localStorage.removeItem('acao');
        localStorage.removeItem('produtoTemporario');
        window.location.href = 'produtos.html';

    } else if (acao === 'finalizarCarrinho') {
        localStorage.removeItem('acao');
        window.location.href = 'index.html';

    } else {
        window.location.href = 'index.html';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const botaoGoogle = document.getElementById('login-google');
    if (botaoGoogle) {
        botaoGoogle.addEventListener('click', loginComGoogle);
    }
});
// Listener de cadastro (executado somente na página de cadastro.html)
document.addEventListener("DOMContentLoaded", () => {
  const botaoCadastro = document.getElementById('btn-cadastrar');
  if (botaoCadastro) {
    botaoCadastro.addEventListener('click', () => {
      const emailInput = document.getElementById('cadastro-email');
      const senhaInput = document.getElementById('cadastro-senha');

      if (!emailInput || !senhaInput) return;

      const email = emailInput.value.trim();
      const senha = senhaInput.value.trim();

      if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      cadastrarEmailSenha(email, senha);
    });
  }
});

