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
// ===== SISTEMA DE CAIXA =====

// Carrinho da venda atual
let carrinho = [];

// Produtos cadastrados (vamos criar o estoque depois)
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Adicionar produto ao carrinho
function adicionarCarrinho() {

    let busca = document.getElementById("codigoProduto").value;
    let quantidade = Number(document.getElementById("quantidadeProduto").value);

    let produto = produtos.find(p =>
        p.nome.toLowerCase() === busca.toLowerCase()
    );

    if (!produto) {
        alert("Produto não encontrado no estoque!");
        return;
    }

    if (produto.quantidade < quantidade) {
        alert("Quantidade insuficiente no estoque!");
        return;
    }

    carrinho.push({
        nome: produto.nome,
        quantidade: quantidade,
        preco: produto.venda
    });

    atualizarCarrinho();

    document.getElementById("codigoProduto").value = "";
    document.getElementById("quantidadeProduto").value = 1;
}


// Atualiza a tela do carrinho
function atualizarCarrinho() {

    let lista = document.getElementById("carrinho");

    if (carrinho.length === 0) {
        lista.innerHTML = "Nenhum produto adicionado.";
        document.getElementById("totalVenda").innerHTML = "0.00";
        return;
    }

    let html = "";
    let total = 0;

    carrinho.forEach((item, index) => {

        let subtotal = item.preco * item.quantidade;

        total += subtotal;

        html += `
        <p>
        ${item.nome} - ${item.quantidade}x
        R$ ${subtotal.toFixed(2)}
        <button onclick="removerItem(${index})">
        ❌
        </button>
        </p>
        `;

    });

    lista.innerHTML = html;

    document.getElementById("totalVenda").innerHTML =
    total.toFixed(2);
}


// Remove item do carrinho
function removerItem(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// Finaliza a venda
function finalizarVenda() {

    if (carrinho.length === 0) {
        alert("Adicione produtos à venda!");
        return;
    }

    let pagamento =
    document.getElementById("pagamento").value;

    let historico =
    JSON.parse(localStorage.getItem("vendas")) || [];

    let total = carrinho.reduce(
        (soma, item) =>
        soma + (item.preco * item.quantidade), 0
    );


    historico.push({
        funcionario: usuario.nome,
        data: new Date().toLocaleString(),
        produtos: carrinho,
        pagamento: pagamento,
        total: total
    });


    localStorage.setItem(
        "vendas",
        JSON.stringify(historico)
    );


    alert(
    "Venda realizada com sucesso!\nTotal: R$ " +
    total.toFixed(2)
    );


    carrinho = [];

    atualizarCarrinho();

}
// Troca as telas do sistema
function abrirTela(tela) {

    let area = document.getElementById("areaTrabalho");

    if (tela === "caixa") {
        area.innerHTML = `
        <h2>💵 Caixa de Vendas</h2>

        <p>Em breve aqui teremos o caixa completo.</p>
        `;
    }

    else if (tela === "estoque") {
    area.innerHTML = `
    <div class="estoque">

    <h2>📦 Controle de Estoque</h2>

    <input type="text" id="nomeProduto"
    placeholder="Nome do produto">

    <input type="text" id="fornecedor"
    placeholder="Fornecedor">

    <input type="number" id="precoCompra"
    placeholder="Preço de compra">

    <input type="number" id="precoVenda"
    placeholder="Preço de venda">

    <input type="number" id="quantidade"
    placeholder="Quantidade em estoque">

    <button onclick="cadastrarProduto()">
    ➕ Cadastrar Produto
    </button>

    <hr>

    <h3>Produtos cadastrados</h3>

    <div id="listaProdutos">
    Nenhum produto cadastrado.
    </div>

    </div>
    `;

    listarProdutos();
}

    else if (tela === "funcionarios") {
        area.innerHTML = `
        <h2>👨‍💼 Funcionários</h2>

        <p>Gerencie os funcionários da borracharia.</p>
        `;
    }

    else if (tela === "relatorios") {
        area.innerHTML = `
        <h2>📊 Relatórios</h2>

        <p>Veja as vendas e lucros da empresa.</p>
        `;
    }

}
// Cadastrar produto
function cadastrarProduto() {

    let nome = document.getElementById("nomeProduto").value;
    let fornecedor = document.getElementById("fornecedor").value;
    let compra = document.getElementById("precoCompra").value;
    let venda = document.getElementById("precoVenda").value;
    let quantidade = document.getElementById("quantidade").value;

    if (
        nome == "" ||
        fornecedor == "" ||
        compra == "" ||
        venda == "" ||
        quantidade == ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    let produtos =
    JSON.parse(localStorage.getItem("produtos")) || [];

    produtos.push({
        nome: nome,
        fornecedor: fornecedor,
        compra: Number(compra),
        venda: Number(venda),
        quantidade: Number(quantidade)
    });

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    alert("Produto cadastrado com sucesso!");

    listarProdutos();

    document.getElementById("nomeProduto").value = "";
    document.getElementById("fornecedor").value = "";
    document.getElementById("precoCompra").value = "";
    document.getElementById("precoVenda").value = "";
    document.getElementById("quantidade").value = "";
}


// Mostrar produtos na tela
function listarProdutos() {

    let lista =
    document.getElementById("listaProdutos");

    let produtos =
    JSON.parse(localStorage.getItem("produtos")) || [];


    if (produtos.length == 0) {
        lista.innerHTML =
        "Nenhum produto cadastrado.";
        return;
    }

    let html = "";

    produtos.forEach((produto, i) => {

        html += `
        <div>
        <h4>${produto.nome}</h4>

        <p>
        Fornecedor: ${produto.fornecedor}<br>
        Compra: R$ ${produto.compra}<br>
        Venda: R$ ${produto.venda}<br>
        Quantidade: ${produto.quantidade}
        </p>

        </div>
        <hr>
        `;
    });

    lista.innerHTML = html;
}
