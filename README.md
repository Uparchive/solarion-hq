# 🌌 SOLARION - Plataforma de Streaming Cinematográfica

Um site de streaming moderno e totalmente funcional para a série de HQ animada **Solarion**, criado com HTML5, CSS3 e JavaScript puro. Totalmente compatível com GitHub Pages.

## ✨ Características

- ✅ **Interface Cinematográfica** - Design inspirado em Netflix com tema sci-fi épico
- ✅ **Tema Escuro Premium** - Preto profundo, detalhes dourados e azul cósmico
- ✅ **Player de Vídeo Integrado** - Suporta YouTube, Vimeo e MP4 direto
- ✅ **Painel Administrativo** - Gerencie episódios facilmente
- ✅ **Armazenamento Local** - Sem servidor necessário (localStorage)
- ✅ **Responsivo** - Perfeito em celular, tablet e desktop
- ✅ **Animações Suaves** - Transições elegantes e efeitos visuais
- ✅ **GitHub Pages Ready** - Deploy em minutos

## 📦 Estrutura do Projeto

```
/
├── index.html                 # Página inicial
├── player.html                # Página do player de vídeo
├── style.css                  # Estilos principais
├── script.js                  # Lógica da aplicação
├── .gitignore                 # Arquivos ignorados no Git
├── README.md                  # Este arquivo
└── /admin/                    # Painel administrativo
    ├── index.html             # Tela de login e painel
    ├── admin.css              # Estilos do admin
    └── admin.js               # Lógica do admin
```

## 🚀 Como Usar

### Localmente

1. **Clone ou baixe o projeto:**
   ```bash
   git clone https://github.com/seu-usuario/solarion-hq.git
   cd solarion-hq
   ```

2. **Abra no navegador:**
   - Clique duplo em `index.html` ou
   - Use uma extensão como "Live Server" no VS Code

### No GitHub Pages

1. **Crie um repositório no GitHub:**
   - Nome: `seu-usuario.github.io` ou `solarion-hq`

2. **Faça push dos arquivos:**
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do Solarion"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git push -u origin main
   ```

3. **Acesse:**
   - `https://seu-usuario.github.io/` (se usar seu-usuario.github.io)
   - `https://seu-usuario.github.io/solarion-hq/` (se usar solarion-hq)

## 🔐 Painel Administrativo

### Acessar o Painel

- **URL:** `/admin/` ou `/admin/index.html`
- **Usuário:** `admin`
- **Senha:** `solarion2026@`

### Funcionalidades

- ✅ **Adicionar Episódios** - Crie novos episódios facilmente
- ✅ **Editar Episódios** - Modifique informações existentes
- ✅ **Deletar Episódios** - Remova episódios não desejados
- ✅ **Upload de Posters** - Adicione capas dos episódios
- ✅ **Integração de Vídeos** - Suporte para YouTube, Vimeo e MP4
- ✅ **Exportar Dados** - Baixe backup de todos os episódios
- ✅ **Resetar Dados** - Restaure episódios padrão quando necessário

## 📝 Adicionar um Episódio

1. Vá para `/admin/`
2. Faça login com as credenciais padrão
3. Clique em "➕ Novo Episódio"
4. Preencha os campos:
   - **Título:** Nome do episódio
   - **Temporada/Episódio:** Números identificadores
   - **Descrição:** Sinopse do episódio
   - **Vídeo:** Link do YouTube, Vimeo ou MP4
   - **Poster:** URL da imagem de capa
   - **Diretor, Duração, Ano:** Informações extras
5. Clique em "Publicar Episódio"

## 🎬 Formatos de Vídeo Suportados

### YouTube
```
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
```

### Vimeo
```
https://vimeo.com/VIDEO_ID
```

### MP4 Direto
```
https://exemplo.com/video.mp4
https://storage.googleapis.com/seu-bucket/video.mp4
```

## 🎨 Personalizar

### Alterar Cores
Edite as variáveis CSS em `style.css`:

```css
:root {
    --accent-gold: #d4af37;      /* Dourado */
    --accent-blue: #00d4ff;      /* Azul Cósmico */
    --primary-dark: #0a0e27;     /* Fundo Escuro */
    /* ... */
}
```

### Mudar Credenciais de Admin
Em `admin/admin.js`, altere:

```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'solarion2026@'
};
```

### Adicionar Episódios Padrão
Em `script.js`, edite o array `DEFAULT_EPISODES`.

## 💾 Armazenamento de Dados

Todos os dados são salvos no **localStorage** do navegador:

```javascript
// Episódios
localStorage.getItem('solarionEpisodes')

// Sessão Admin
localStorage.getItem('solarionAdminSession')
```

Para fazer backup, use a função "Exportar Dados" no painel admin.

## 🔧 Troubleshooting

### Player não carrega no GitHub Pages
- Certifique-se que os links de vídeo são HTTPS
- YouTube e Vimeo funcionam perfeitamente
- Para MP4, use serviço de armazenamento com CORS (Google Cloud Storage, AWS S3, etc)

### Admin não funciona após fazer deploy
- Verifique se a pasta `/admin/` e seus arquivos estão no repositório
- GitHub Pages automáticamente abre `index.html` para URLs sem extensão

### Episódios desaparecem após atualizar
- localStorage é específico do navegador e domínio
- Use "Exportar Dados" para backup regularmente
- Se mudar de navegador, os dados não seguem

## 📱 Responsividade

O site é 100% responsivo:

- **Desktop:** Layout completo com todos os efeitos
- **Tablet:** Ajustes de grid e espaçamento
- **Mobile:** Interface otimizada com toques

## ⚡ Performance

- Carregamento rápido (sem dependências externas)
- Arquivo CSS: ~20KB
- Arquivo JS: ~15KB
- Suporta conexões lentas

## 🌐 Compatibilidade

- ✅ Chrome/Edge (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Licença

Projeto de código aberto. Use livremente para fins pessoais e comerciais.

## 🤝 Contribuições

Gostou? Compartilhe e customize conforme desejar!

## 👨‍💻 Suporte

Para dúvidas ou problemas, verifique:
1. Se os arquivos estão no local correto
2. Se o navegador suporta localStorage
3. Se os links de vídeo são acessíveis

---

**SOLARION** - Bem-vindo ao universo cinematográfico de ficção científica. 🌟

Criado com ❤️ para uma experiência streaming épica.
