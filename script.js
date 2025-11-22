let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    //Se os dados ainda não forem carregados, busca o JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("dados.json");
            dados = await resposta.json();
        } catch (erro) {
            console.error("Erro ao buscar dados:", erro);
            return; //Interrompe a execução se houver erros
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.eixos.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; //Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.eixos}</h2>
        <p>${dado.descricao}</p>
        `
        cardContainer.appendChild(article);
    }
}