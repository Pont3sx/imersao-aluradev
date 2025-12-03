document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES ---
    const campoBusca = document.querySelector('input[type="text"]');
    const botaoBusca = document.getElementById('botao-busca');
    const containerCards = document.querySelector('.card-container');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // --- LÓGICA DO MODO ESCURO ---

    // Função para aplicar o tema (claro ou escuro)
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Evento de clique no botão para alternar o tema
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Define o tema inicial com base no que está salvo ou na preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(defaultTheme);


    // --- LÓGICA DA BUSCA ---

    function aplicarFiltro(termo) {
        const cards = containerCards.querySelectorAll('article');
        const termoBusca = termo.toLowerCase().trim();

        if (!termoBusca) {
            cards.forEach(card => card.style.display = 'flex');
            return;
        }

        cards.forEach(card => {
            const titulo = card.querySelector('h2')?.textContent.toLowerCase() || '';
            const descricao = card.querySelector('p')?.textContent.toLowerCase() || '';
            const conteudo = titulo + ' ' + descricao;

            if (conteudo.includes(termoBusca)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function iniciarBusca() {
        if (campoBusca) {
            aplicarFiltro(campoBusca.value);
        }
    }

    // Adiciona eventos para o botão de busca e para a tecla "Enter"
    if (botaoBusca) {
        botaoBusca.addEventListener('click', (e) => {
            e.preventDefault();
            iniciarBusca();
        });
    }

    if (campoBusca) {
        campoBusca.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                iniciarBusca();
            }
        });
        // Opcional: filtrar enquanto digita
        // campoBusca.addEventListener('input', () => {
        //     iniciarBusca();
        // });
    }
});