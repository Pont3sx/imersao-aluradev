const campoBusca = document.querySelector('input[type="text"]');
const botaoBusca = document.getElementById('botao-busca');
const containerCards = document.querySelector('.card-container');

function filtrarCards() {
    if (!containerCards) return;

    const termo = (campoBusca?.value || '').toLowerCase().trim();

    let cards = containerCards.querySelectorAll('article');

    if (cards.length === 0) {
        carregarDadosEConstruirCards().then(() => {
            cards = containerCards.querySelectorAll('article');
            aplicarFiltro(cards, termo);
        });
        return;
    }

    aplicarFiltro(cards, termo);
}

function aplicarFiltro(cardsNodeList, termo) {
    const cards = Array.from(cardsNodeList);

    if (!termo) {
        cards.forEach(card => card.style.display = '');
        return;
    }

    cards.forEach(card => {
        const titulo = card.querySelector('h2')?.textContent.toLowerCase() ?? '';
        const descricao = card.querySelector('p')?.textContent.toLowerCase() ?? '';
        const conteudo = (titulo + ' ' + descricao);

        if (conteudo.includes(termo)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

async function carregarDadosEConstruirCards() {
  if (!containerCards) return;

  try {
    const resp = await fetch('dados.json');
    const dados = await resp.json();

    const icones = {
      'educacao': 'fa-graduation-cap',
      'saude': 'fa-heart-pulse',
      'meio-ambiente': 'fa-leaf',
      'tecnologia': 'fa-microchip',
      'cultura': 'fa-palette',
      'seguranca-publica': 'fa-shield-halved',
      'economia': 'fa-coins',
      'politica-cidadania': 'fa-landmark-flag',
      'desigualdade-questoes-sociais': 'fa-scale-balanced',
      'ciencia-innovacao': 'fa-flask-vial'
    };

    function slugify(text) {
      return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim().replace(/\s+/g, '-');
    }

    containerCards.innerHTML = '';

    for (const item of dados) {
      const slug = slugify(item.eixos);
      const classe = `card-${slug}`;
      const icone = icones[slug] || 'fa-circle-info';

      const article = document.createElement('article');
      article.classList.add('card', classe);

      article.innerHTML = `
        <div class="card-icon"><i class="fa-solid ${icone}"></i></div>
        <div class="card-info">
          <h2>${item.eixos}</h2>
          <p>${item.descricao}</p>
        </div>
      `;

      containerCards.appendChild(article);
    }
  } catch (err) {
    console.error('Erro ao carregar dados.json:', err);
  }
}

if (botaoBusca) {
  botaoBusca.addEventListener('click', e => {
    e.preventDefault();
    filtrarCards();
  });
}

if (campoBusca) {
  campoBusca.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filtrarCards();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const existing = containerCards.querySelectorAll('article');
  if (!existing || existing.length === 0) {
    carregarDadosEConstruirCards();
  }
});
