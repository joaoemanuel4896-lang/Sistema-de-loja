// Verifica se existe alguém logado
let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

// Se não estiver logado, volta para o login
if (!usuario) {
    window.location.href = "index.html";
}

// Mostra o nome do funcionário na tela
let nomeUsuario = document.getElementById("nomeUsuario");

if (nomeUsuario) {
    nomeUsuario.innerHTML = `
        👤 ${usuario.nome}<br>
        <small>${usuario.cargo}</small>
    `;
}


// Função para sair do sistema
function sair() {

    let confirmar = confirm(
        "Deseja realmente sair do sistema?"
    );

    if (confirmar) {

        localStorage.removeItem("usuarioLogado");

        alert("Você saiu do sistema!");

        window.location.href = "index.html";
    }
}


// Preparação dos botões do menu
let botoes = document.querySelectorAll(".menu button");

botoes.forEach(botao => {

    botao.addEventListener("click", function() {

        console.log("Você clicou em:", this.innerText);

    });

});
