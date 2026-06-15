let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let caixa = Number(localStorage.getItem("caixa")) || 0;

atualizarTela();

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("caixa", caixa);
}

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let fornecedor = document.getElementById("fornecedor").value;
    let compra = Number(document.getElementById("compra").value);
    let venda = Number(document.getElementById("venda").value);
    let quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || quantidade <= 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    produtos.push({
        nome,
        fornecedor,
        compra,
        venda,
        quantidade
    });

    salvar();
    atualizarTela();
    limparCampos();

    alert("Produto cadastrado com sucesso!");
}

function atualizarTela() {
    let estoque = document.getElementById("estoque");
    estoque.innerHTML = "";

    produtos.forEach((p, index) => {
        estoque.innerHTML += `
            <div class="item">
                <strong>${p.nome}</strong><br>
                Fornecedor: ${p.fornecedor}<br>
                Compra: R$ ${p.compra.toFixed(2)}<br>
                Venda: R$ ${p.venda.toFixed(2)}<br>
                Estoque: ${p.quantidade}<br>
                <button onclick="excluir(${index})">
                    Excluir
                </button>
            </div>
        `;
    });

    document.getElementById("caixa").innerText =
        caixa.toFixed(2);
}

function vender() {
    let nome = document.getElementById("produtoVenda").value;
    let quantidade = Number(document.getElementById("qtdVenda").value);

    let produto = produtos.find(p =>
        p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (produto.quantidade < quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;
    caixa += produto.venda * quantidade;

    salvar();
    atualizarTela();

    alert("Venda realizada com sucesso!");
}

function excluir(index) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(index, 1);
        salvar();
        atualizarTela();
    }
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("fornecedor").value = "";
    document.getElementById("compra").value = "";
    document.getElementById("venda").value = "";
    document.getElementById("quantidade").value = "";
}
