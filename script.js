// Funcionários cadastrados no sistema
let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [
    {
        usuario: "admin",
        senha: "1234",
        nome: "Administrador",
        cargo: "Administrador"
    }
];

// Salva os funcionários no sistema
localStorage.setItem(
    "funcionarios",
    JSON.stringify(funcionarios)
);


// Função de login
function entrar() {

    let usuario = document
    .getElementById("usuario").value;

    let senha = document
    .getElementById("senha").value;


    let funcionario = funcionarios.find(f =>
        f.usuario === usuario &&
        f.senha === senha
    );


    if (funcionario) {

        // Salva quem está usando o caixa
        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(funcionario)
        );

        // Vai abrir o sistema
        alert(
            "Bem-vindo " +
            funcionario.nome
        );

        // Depois vamos mudar para a tela do caixa
        window.location.href = "painel.html";

    } else {

        document
        .getElementById("mensagem")
        .innerHTML =
        "Usuário ou senha incorretos!";

    }
}
