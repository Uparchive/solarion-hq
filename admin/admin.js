/* ================================
   SOLARION ADMIN - JAVASCRIPT
   Lógica do Painel Administrativo
   ================================ */

// Credenciais de acesso
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'solarion2026@'
};

// Estado da aplicação
let currentUser = null;
let currentEditingId = null;

// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener('DOMContentLoaded', function() {
    generateStarfield();
    checkLogin();
    setupEventListeners();
});

function checkLogin() {
    const savedSession = localStorage.getItem('solarionAdminSession');
    if (savedSession && isSessionValid(savedSession)) {
        currentUser = JSON.parse(savedSession);
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

function isSessionValid(sessionData) {
    try {
        const session = JSON.parse(sessionData);
        const createdAt = new Date(session.createdAt).getTime();
        const now = new Date().getTime();
        const expired = (now - createdAt) > (24 * 60 * 60 * 1000); // 24 horas
        return !expired;
    } catch {
        return false;
    }
}

function generateStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;

    for (let i = 0; i < 50; i++) {
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
        `;
        starfield.appendChild(star);
    }
}

// ================================
// LOGIN
// ================================

function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Navegação do sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            switchSection(section);
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Form de episódio
    const episodeForm = document.getElementById('episodeForm');
    if (episodeForm) {
        episodeForm.addEventListener('submit', handleSaveEpisode);
    }

    // Visualização de poster
    const posterInput = document.getElementById('poster');
    if (posterInput) {
        posterInput.addEventListener('change', previewPoster);
    }

    // Botão voltar
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => switchSection('episodes'));
    }
}

function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Login bem-sucedido
        currentUser = {
            username: username,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('solarionAdminSession', JSON.stringify(currentUser));
        loginError.style.display = 'none';
        
        setTimeout(() => {
            showAdminPanel();
        }, 300);
    } else {
        // Login falhou
        loginError.style.display = 'block';
        document.getElementById('password').value = '';
    }
}

function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('solarionAdminSession');
        currentUser = null;
        currentEditingId = null;
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        showLoginScreen();
        showToast('Sessão encerrada', 'success');
    }
}

function showLoginScreen() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminContainer').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'flex';
    
    loadEpisodesList();
    switchSection('episodes');
    updateEpisodeCount();
}

// ================================
// NAVEGAÇÃO DE SEÇÕES
// ================================

function switchSection(sectionName) {
    // Remover active de todas as seções
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Remover active de todos os nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Ativar seção e nav item
    const section = document.getElementById(sectionName + '-section');
    if (section) {
        section.classList.add('active');
    }

    const navItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }

    // Atualizar título
    const titles = {
        'episodes': 'Gerenciar Episódios',
        'add-episode': 'Novo Episódio',
        'settings': 'Configurações'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionName] || 'SOLARION Admin';

    // Limpar form se voltando de edição
    if (sectionName === 'episodes') {
        resetEpisodeForm();
    } else if (sectionName === 'add-episode') {
        resetEpisodeForm();
        document.getElementById('formTitle').textContent = 'Novo Episódio';
        document.getElementById('backBtn').style.display = 'none';
    }
}

// ================================
// GERENCIAMENTO DE EPISÓDIOS
// ================================

function loadEpisodesList() {
    const episodes = getAllEpisodes();
    const list = document.getElementById('episodesList');
    const noEpisodes = document.getElementById('noEpisodes');

    if (episodes.length === 0) {
        list.style.display = 'none';
        noEpisodes.style.display = 'block';
        return;
    }

    list.style.display = 'grid';
    noEpisodes.style.display = 'none';
    list.innerHTML = '';

    episodes.forEach(episode => {
        const item = createEpisodeItem(episode);
        list.appendChild(item);
    });
}

function createEpisodeItem(episode) {
    const item = document.createElement('div');
    item.className = 'episode-item';
    item.innerHTML = `
        <div class="episode-item-info">
            <h3>${episode.title}</h3>
            <div class="episode-item-meta">
                Temporada ${episode.season} • Episódio ${episode.number} • ${episode.duration}
            </div>
        </div>
        <div class="episode-item-actions">
            <button class="btn-edit" onclick="editEpisode('${episode.id}')">
                ✏️ Editar
            </button>
            <button class="btn-delete" onclick="confirmDeleteEpisode('${episode.id}')">
                🗑️ Deletar
            </button>
        </div>
    `;
    return item;
}

function editEpisode(episodeId) {
    const episode = getEpisodeById(episodeId);
    if (!episode) return;

    currentEditingId = episodeId;

    // Preencher form
    document.getElementById('title').value = episode.title;
    document.getElementById('season').value = episode.season || 1;
    document.getElementById('number').value = episode.number || 1;
    document.getElementById('description').value = episode.description;
    document.getElementById('director').value = episode.director;
    document.getElementById('duration').value = episode.duration;
    document.getElementById('year').value = episode.year;
    document.getElementById('videoUrl').value = episode.videoUrl;
    document.getElementById('poster').value = episode.poster;
    document.getElementById('editingId').value = episodeId;

    // Atualizar UI
    document.getElementById('formTitle').textContent = `Editar: ${episode.title}`;
    document.getElementById('submitBtnText').textContent = 'Salvar Alterações';
    document.getElementById('deleteBtnForm').style.display = 'inline-block';
    document.getElementById('backBtn').style.display = 'inline-block';

    // Mostrar preview do poster
    if (episode.poster) {
        previewPoster({ target: { value: episode.poster } });
    }

    switchSection('add-episode');
}

function confirmDeleteEpisode(episodeId) {
    const episode = getEpisodeById(episodeId);
    if (!episode) return;

    if (confirm(`Tem certeza que deseja deletar "${episode.title}"?\n\nEsta ação não pode ser desfeita.`)) {
        deleteEpisode(episodeId);
        loadEpisodesList();
        updateEpisodeCount();
        showToast(`Episódio "${episode.title}" deletado com sucesso`, 'success');
    }
}

function deleteCurrentEpisode() {
    if (!currentEditingId) return;

    const episode = getEpisodeById(currentEditingId);
    if (!episode) return;

    if (confirm(`Tem certeza que deseja deletar "${episode.title}"?\n\nEsta ação não pode ser desfeita.`)) {
        deleteEpisode(currentEditingId);
        loadEpisodesList();
        updateEpisodeCount();
        resetEpisodeForm();
        switchSection('episodes');
        showToast(`Episódio "${episode.title}" deletado com sucesso`, 'success');
    }
}

function handleSaveEpisode(e) {
    e.preventDefault();

    const episodeData = {
        title: document.getElementById('title').value,
        season: parseInt(document.getElementById('season').value),
        number: parseInt(document.getElementById('number').value),
        description: document.getElementById('description').value,
        director: document.getElementById('director').value,
        duration: document.getElementById('duration').value,
        year: parseInt(document.getElementById('year').value),
        videoUrl: document.getElementById('videoUrl').value,
        poster: document.getElementById('poster').value
    };

    if (!episodeData.title || !episodeData.description || !episodeData.videoUrl || !episodeData.poster) {
        showToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    let savedEpisode;
    if (currentEditingId) {
        savedEpisode = updateEpisode(currentEditingId, episodeData);
        showToast(`Episódio "${episodeData.title}" atualizado com sucesso`, 'success');
    } else {
        savedEpisode = addEpisode(episodeData);
        showToast(`Episódio "${episodeData.title}" publicado com sucesso`, 'success');
    }

    // Resetar form e voltar
    loadEpisodesList();
    updateEpisodeCount();
    resetEpisodeForm();
    switchSection('episodes');
}

function resetEpisodeForm() {
    document.getElementById('episodeForm').reset();
    document.getElementById('poster').value = '';
    document.getElementById('posterPreview').style.display = 'none';
    document.getElementById('posterError').style.display = 'none';
    document.getElementById('editingId').value = '';
    document.getElementById('submitBtnText').textContent = 'Publicar Episódio';
    document.getElementById('deleteBtnForm').style.display = 'none';
    currentEditingId = null;

    // Resetar valores padrão
    document.getElementById('season').value = '1';
    document.getElementById('number').value = '1';
    document.getElementById('director').value = 'Solarion Studios';
    document.getElementById('duration').value = '45 min';
    document.getElementById('year').value = new Date().getFullYear();
}

// ================================
// PREVIEW DE POSTER
// ================================

function previewPoster(e) {
    const url = e.target.value || document.getElementById('poster').value;
    const preview = document.getElementById('posterPreview');
    const error = document.getElementById('posterError');

    if (!url) {
        preview.style.display = 'none';
        error.style.display = 'none';
        return;
    }

    const img = new Image();
    img.onload = function() {
        preview.innerHTML = '';
        preview.appendChild(img);
        preview.style.display = 'flex';
        error.style.display = 'none';
    };
    img.onerror = function() {
        preview.style.display = 'none';
        error.style.display = 'block';
        error.textContent = 'Erro ao carregar a imagem. Verifique a URL.';
    };
    img.src = url;
}

// ================================
// CONFIGURAÇÕES
// ================================

function resetEpisodes() {
    if (confirm('Tem certeza que deseja restaurar os episódios padrão?\n\nTodos os episódios atuais serão perdidos!')) {
        localStorage.setItem('solarionEpisodes', JSON.stringify(DEFAULT_EPISODES));
        loadEpisodesList();
        updateEpisodeCount();
        showToast('Episódios restaurados aos padrões', 'success');
    }
}

function exportData() {
    const episodes = getAllEpisodes();
    const dataStr = JSON.stringify(episodes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solarion-episodes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Dados exportados com sucesso', 'success');
}

function updateEpisodeCount() {
    const episodes = getAllEpisodes();
    document.getElementById('episodeCount').textContent = `${episodes.length} episódio(s) publicado(s)`;
}

// ================================
// NOTIFICAÇÕES (TOAST)
// ================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ================================
// REFERÊNCIA DO SCRIPT.JS
// ================================

// Essas funções são definidas em script.js e podem ser usadas aqui:
// - addEpisode(episodeData)
// - updateEpisode(episodeId, episodeData)
// - deleteEpisode(episodeId)
// - getAllEpisodes()
// - getEpisodeById(episodeId)
// - DEFAULT_EPISODES
