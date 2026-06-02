/* ================================
   SOLARION - SCRIPT PRINCIPAL
   Gerenciamento de Episódios
   ================================ */

// Configuração de dados padrão
const DEFAULT_EPISODES = [
    {
        id: '1',
        title: 'Despertar Cósmico',
        season: 1,
        number: 1,
        description: 'A humanidade descobre sinais de uma civilização antiga no coração do sistema Solarion. Uma equipe de exploradores é enviada para desvendar os mistérios que esperam além das estrelas.',
        year: 2026,
        director: 'Solarion Studios',
        duration: '45 min',
        poster: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x1="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2300d4ff;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230a0e27;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="450" fill="url(%23grad1)"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" font-size="24" font-weight="bold" fill="%23d4af37" text-anchor="middle" dominant-baseline="middle"%3ESOLARION%3C/text%3E%3Ctext x="50%25" y="60%25" font-size="14" fill="%23e0e0e0" text-anchor="middle"%3EDesertar Cósmico%3C/text%3E%3C/svg%3E',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: '2',
        title: 'Nas Profundezas do Vácuo',
        season: 1,
        number: 2,
        description: 'A equipe de exploração enfrenta perigos inimagináveis enquanto navega pelas anomalias espaciais. Uma entidade antiga despertou, e ela não está sozinha.',
        year: 2026,
        director: 'Solarion Studios',
        duration: '48 min',
        poster: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x1="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23d4af37;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230a0e27;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="450" fill="url(%23grad2)"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" font-size="24" font-weight="bold" fill="%2300d4ff" text-anchor="middle" dominant-baseline="middle"%3ESOLARION%3C/text%3E%3Ctext x="50%25" y="60%25" font-size="14" fill="%23e0e0e0" text-anchor="middle"%3ENas Profundezas do Vácuo%3C/text%3E%3C/svg%3E',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: '3',
        title: 'Aliança Cósmica',
        season: 1,
        number: 3,
        description: 'Forças opostas se unem para enfrentar uma ameaça maior. A verdade sobre Solarion começa a se revelar, mudando para sempre o destino da humanidade.',
        year: 2026,
        director: 'Solarion Studios',
        duration: '52 min',
        poster: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x1="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%230a0e27;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2300d4ff;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="450" fill="url(%23grad3)"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" font-size="24" font-weight="bold" fill="%23d4af37" text-anchor="middle" dominant-baseline="middle"%3ESOLARION%3C/text%3E%3Ctext x="50%25" y="60%25" font-size="14" fill="%23e0e0e0" text-anchor="middle"%3EAliança Cósmica%3C/text%3E%3C/svg%3E',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
];

// Inicialização quando o DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
    initializeSolarion();
    loadEpisodes();
    setupEventListeners();
});

/**
 * Inicializa o sistema Solarion
 */
function initializeSolarion() {
    // Carregar episódios do localStorage ou usar padrão
    const storedEpisodes = localStorage.getItem('solarionEpisodes');
    if (!storedEpisodes) {
        localStorage.setItem('solarionEpisodes', JSON.stringify(DEFAULT_EPISODES));
    }

    // Gerar starfield dinâmico
    generateStarfield();
}

/**
 * Gera o efeito de starfield dinâmico
 */
function generateStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starfield.appendChild(star);
    }
}

/**
 * Carrega e exibe os episódios
 */
function loadEpisodes() {
    const episodes = JSON.parse(localStorage.getItem('solarionEpisodes')) || [];

    if (episodes.length === 0) {
        console.warn('Nenhum episódio encontrado');
        return;
    }

    // Exibir episódio principal no banner
    displayBannerEpisode(episodes[0]);

    // Exibir lista de episódios
    displayEpisodesList(episodes);
}

/**
 * Exibe o episódio principal no banner
 */
function displayBannerEpisode(episode) {
    const bannerTitle = document.getElementById('bannerTitle');
    const bannerDescription = document.getElementById('bannerDescription');
    const bannerPoster = document.getElementById('bannerPoster');
    const playBtn = document.getElementById('playBtn');

    if (bannerTitle) bannerTitle.textContent = episode.title;
    if (bannerDescription) bannerDescription.textContent = episode.description;
    if (bannerPoster) bannerPoster.src = episode.poster;

    if (playBtn) {
        playBtn.onclick = () => {
            window.location.href = `player.html?id=${episode.id}`;
        };
    }
}

/**
 * Exibe a lista de episódios
 */
function displayEpisodesList(episodes) {
    const container = document.getElementById('episodesContainer');
    if (!container) return;

    container.innerHTML = '';

    episodes.forEach((episode, index) => {
        const card = createEpisodeCard(episode, index);
        container.appendChild(card);
    });
}

/**
 * Cria um card de episódio
 */
function createEpisodeCard(episode, index) {
    const card = document.createElement('div');
    card.className = 'episode-card';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <div class="episode-poster-container">
            <img src="${episode.poster}" alt="${episode.title}" class="episode-poster">
            <div class="episode-poster-overlay">
                <div class="play-icon">▶</div>
            </div>
        </div>
        <div class="episode-info">
            <h3 class="episode-card-title">${episode.title}</h3>
            <p class="episode-card-meta">
                Ep. ${episode.number || index + 1} • ${episode.duration || '45 min'}
            </p>
        </div>
    `;

    card.onclick = () => {
        window.location.href = `player.html?id=${episode.id}`;
    };

    return card;
}

/**
 * Setup de event listeners
 */
function setupEventListeners() {
    // Scroll automático suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Efeito de hover nos botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Função para adicionar novo episódio (usada pelo painel admin)
 */
function addEpisode(episodeData) {
    const episodes = JSON.parse(localStorage.getItem('solarionEpisodes')) || [];
    
    const newEpisode = {
        id: Date.now().toString(),
        title: episodeData.title || 'Sem Título',
        season: episodeData.season || 1,
        number: episodes.length + 1,
        description: episodeData.description || '',
        year: episodeData.year || new Date().getFullYear(),
        director: episodeData.director || 'Solarion Studios',
        duration: episodeData.duration || '45 min',
        poster: episodeData.poster || DEFAULT_EPISODES[0].poster,
        videoUrl: episodeData.videoUrl || ''
    };

    episodes.push(newEpisode);
    localStorage.setItem('solarionEpisodes', JSON.stringify(episodes));
    
    return newEpisode;
}

/**
 * Função para atualizar episódio (usada pelo painel admin)
 */
function updateEpisode(episodeId, episodeData) {
    let episodes = JSON.parse(localStorage.getItem('solarionEpisodes')) || [];
    
    const index = episodes.findIndex(ep => ep.id === episodeId);
    if (index === -1) return null;

    episodes[index] = {
        ...episodes[index],
        ...episodeData,
        id: episodeId
    };

    localStorage.setItem('solarionEpisodes', JSON.stringify(episodes));
    return episodes[index];
}

/**
 * Função para deletar episódio (usada pelo painel admin)
 */
function deleteEpisode(episodeId) {
    let episodes = JSON.parse(localStorage.getItem('solarionEpisodes')) || [];
    episodes = episodes.filter(ep => ep.id !== episodeId);
    localStorage.setItem('solarionEpisodes', JSON.stringify(episodes));
}

/**
 * Função para obter todos os episódios
 */
function getAllEpisodes() {
    return JSON.parse(localStorage.getItem('solarionEpisodes')) || [];
}

/**
 * Função para obter episódio por ID
 */
function getEpisodeById(episodeId) {
    const episodes = getAllEpisodes();
    return episodes.find(ep => ep.id === episodeId);
}
