# 🚀 Guia de Publicação - SOLARION no GitHub Pages

## Passo 1: Preparar o Repositório no GitHub

### Opção A: Usar `seu-usuario.github.io` (Recomendado)

1. **Crie um novo repositório:**
   - URL: `https://github.com/seu-usuario/seu-usuario.github.io`
   - Substitua `seu-usuario` pelo seu nome de usuário GitHub
   - Marque como Público

2. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-usuario.github.io.git
   cd seu-usuario.github.io
   ```

3. **Copie os arquivos SOLARION:**
   - Copie todos os arquivos desta pasta para o repositório
   - Mantenha a estrutura:
     ```
     /
     ├── index.html
     ├── player.html
     ├── style.css
     ├── script.js
     ├── README.md
     ├── .gitignore
     └── /admin/
         ├── index.html
         ├── admin.css
         └── admin.js
     ```

### Opção B: Usar um repositório específico (Ex: `solarion-hq`)

1. **Crie o repositório:**
   - URL: `https://github.com/seu-usuario/solarion-hq`
   - Marque como Público

2. **Clone e configure:**
   ```bash
   git clone https://github.com/seu-usuario/solarion-hq.git
   cd solarion-hq
   ```

3. **Copie os arquivos e configure:** Confira instruções de publicação no próprio repositório

## Passo 2: Enviar os Arquivos

### Primeira vez:

```bash
# Dentro da pasta do repositório
git add .
git commit -m "🌌 SOLARION: Plataforma de streaming cinematográfica"
git branch -M main
git push -u origin main
```

### Atualizações futuras:

```bash
git add .
git commit -m "Sua mensagem aqui"
git push origin main
```

## Passo 3: Ativar GitHub Pages

### Se usar `seu-usuario.github.io`:
- Não precisa fazer nada! 🎉
- Acesse: `https://seu-usuario.github.io/`
- O site fica ao vivo automaticamente

### Se usar `solarion-hq`:

1. Vá para **Settings** do repositório
2. Procure por **Pages** no menu esquerdo
3. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
4. Clique em **Save**
5. Aguarde alguns minutos (status muda de amarelo para verde)
6. Acesse: `https://seu-usuario.github.io/solarion-hq/`

## Passo 4: Testar o Site

### Verificar se está online:

```bash
# Aguarde 5-10 minutos após o push
# Depois acesse sua URL:

# Opção A:
https://seu-usuario.github.io/

# Opção B:
https://seu-usuario.github.io/solarion-hq/

# Admin:
https://seu-usuario.github.io/admin/
# ou
https://seu-usuario.github.io/solarion-hq/admin/
```

## Dicas Importantes

### ✅ Admin do GitHub Pages
- URL do admin: `/admin/` funciona automaticamente (GitHub Pages abre o index.html)
- Credentials: `admin` / `solarion2026@`
- Dados salvos em localStorage

### ✅ Vídeos no GitHub Pages
- YouTube/Vimeo: Funcionam perfeitamente ✅
- MP4 direto: Use serviços com CORS:
  - Google Cloud Storage
  - AWS S3 com CORS configurado
  - Cloudinary
  - Imgur (para testes)

### ⚠️ Problemas Comuns

**"Domain not found"**
- Aguarde 5-10 minutos após o push
- Verifique se está em um repositório público
- Acesse sua URL corretamente

**"Admin não funciona"**
- Certifique-se que `/admin/index.html` foi enviado
- Verifique se a pasta está no repositório
- Teste em aba incógnita (pode ser cache)

**"Videos não carregam"**
- YouTube/Vimeo: Precisam estar públicos
- MP4: Precisa estar em servidor com CORS

### ✅ Otimizações para GitHub Pages

1. **Cache busting** (alterar arquivo):
   ```html
   <link rel="stylesheet" href="style.css?v=1.0.0">
   ```

2. **Usar asset paths corretos:**
   ```javascript
   // ✅ Funciona em GitHub Pages
   window.location.href = 'index.html'
   // ✅ Também funciona
   window.location.href = '/solarion-hq/index.html'
   ```

3. **Domínio customizado:**
   - Adicione arquivo `CNAME` na raiz com seu domínio
   - Configure DNS no seu provedor
   - Leia a documentação GitHub Pages

## Próximos Passos

### Personalizar o Site

1. **Adicionar mais episódios:**
   - Vá ao `/admin/`
   - Faça login (admin/solarion2026@)
   - Clique em "Novo Episódio"

2. **Editar conteúdo:**
   - Edite `README.md` para informações do projeto
   - Customize as cores em `style.css`
   - Altere credenciais em `admin/admin.js`

3. **Usar domínio custom:**
   - Arquivo `CNAME` com seu domínio
   - Configurar DNS apontando para GitHub Pages
   - [Documentação oficial](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📞 Suporte

### Documentação Oficial
- GitHub Pages: https://docs.github.com/en/pages
- Troubleshooting: https://docs.github.com/en/pages/getting-started-with-github-pages

### Dúvidas Comuns
- **Como fazer backup?** Use "Exportar Dados" no admin
- **Como resetar episódios?** Use "Resetar Dados" no admin
- **Como mudar senha?** Edite `ADMIN_CREDENTIALS` em `admin/admin.js`

---

🎉 Pronto! Seu SOLARION estará ao vivo em minutos!

Divirta-se criando conteúdo cinematográfico de ficção científica! 🌟
