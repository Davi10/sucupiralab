# Instalação do SucupiraLAB

Não é necessário instalar nada localmente. O GitHub faz o build e publica o app automaticamente.

---

## Passo 1 — Fork do repositório

1. Acesse **github.com/ombudsmanviktor/sucupiralab**
2. Clique em **Fork** (canto superior direito)
3. Escolha sua conta como destino e confirme

Você terá uma cópia em `github.com/SEU-USUARIO/sucupiralab`.

---

## Passo 2 — Ativar o GitHub Pages

1. No seu fork, acesse **Settings → Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve

O GitHub irá executar o workflow automaticamente e publicar o app. Aguarde cerca de 1–2 minutos e acesse:

```
https://SEU-USUARIO.github.io/sucupiralab
```

> Você pode acompanhar o progresso em **Actions** → workflow "Build e deploy no GitHub Pages".

---

## Passo 3 — Criar o repositório de dados

O SucupiraLAB armazena seus dados em YAML num repositório GitHub **privado** de sua propriedade.

1. Acesse **github.com → New repository**
2. Deixe o repositório **privado**
3. Marque **"Add a README file"** (para inicializar o branch `main`)
4. Anote o nome do repositório criado

---

## Passo 4 — Gerar um Personal Access Token (PAT)

1. Acesse **github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Clique em **Generate new token (classic)**
3. Selecione o escopo **`repo`**
4. Clique em **Generate token** e copie o valor (`ghp_...`)

> ⚠️ O token é exibido apenas uma vez. Guarde-o em local seguro.

---

## Passo 5 — Configurar o login

Acesse `https://SEU-USUARIO.github.io/sucupiralab` e preencha:

- **Personal Access Token** — o valor copiado no Passo 4
- **Usuário / Org** — seu nome de usuário no GitHub
- **Repositório** — nome do repositório criado no Passo 3
- **Branch** — `main` (padrão)

Clique em **Conectar e entrar**.

---

## Login com Google (opcional)

Para habilitar o login com Google, edite o arquivo `public/config.json` no seu fork e preencha os campos do bloco `firebase` com as credenciais do seu projeto Firebase. O commit acionará um novo deploy automaticamente.

Deixe os campos em branco para usar apenas o modo PAT — o app funciona normalmente sem Firebase.

---

## Instalação local (desenvolvimento)

Se preferir rodar o app localmente:

```bash
git clone https://github.com/SEU-USUARIO/sucupiralab.git
cd sucupiralab
npm install
npm run dev        # http://localhost:5173
```

---

## Estrutura de dados

Os dados são salvos no repositório GitHub configurado no login:

```
data/
  prestacoes/          ← Prestações de Contas
  discursos/           ← Discursos Qualificados
  projetos/            ← Projetos Financiados
  orientacoes/         ← Orientações
  producao/            ← Produção Científica
  submissoes/          ← Submissões
  nucleacoes/          ← Nucleação
  internacionalizacao/ ← Internacionalização
attachments/           ← Anexos (base64 via API)
```

Cada registro é um arquivo `.yaml` independente, editável diretamente pelo GitHub se necessário.
