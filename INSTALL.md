# Instalação do SucupiraLAB

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- [Git](https://git-scm.com)
- Uma conta no [GitHub](https://github.com)

---

## 1. Clonar o repositório

```bash
git clone https://github.com/ombudsmanviktor/sucupiralab.git
cd sucupiralab
npm install
```

---

## 2. Criar o repositório de dados no GitHub

O SucupiraLAB armazena todos os seus dados em YAML num repositório GitHub **privado** de sua propriedade.

1. Acesse **github.com → New repository**
2. Deixe o repositório **privado**
3. Marque "Add a README file" (para inicializar o branch `main`)
4. Anote o nome de usuário e o nome do repositório criado

---

## 3. Gerar um Personal Access Token (PAT)

1. Acesse **github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Clique em **Generate new token (classic)**
3. Marque o escopo **`repo`** (acesso completo a repositórios privados)
4. Clique em **Generate token** e copie o valor gerado (`ghp_...`)

> ⚠️ O token é exibido apenas uma vez. Guarde-o em local seguro.

---

## 4. Iniciar o app

```bash
npm run dev
```

Acesse **http://localhost:5173** no browser.

---

## 5. Configurar o login

Na tela de login:

1. Cole o **PAT** no campo "Personal Access Token"
2. Preencha **Usuário / Org** com seu nome de usuário GitHub
3. Preencha **Repositório** com o nome do repositório de dados criado no Passo 2
4. Confirme o **Branch** (padrão: `main`)
5. Clique em **Conectar e entrar**

O app testará a conexão e, em caso de sucesso, redirecionará para a tela principal.

---

## Login com Google (opcional)

Para habilitar o login com Google (via Firebase), edite `public/config.json` e preencha os campos do bloco `firebase` com as credenciais do seu projeto Firebase.

Deixe os campos em branco para desativar — o app funcionará normalmente só com PAT.

---

## Uso em produção (build local)

```bash
npm run build
npm run preview
```

O app ficará disponível em **http://localhost:4173**.

---

## Estrutura de dados

Os dados são salvos automaticamente no repositório GitHub configurado no login, organizados em subpastas:

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
