# Projeto Trybe Futebol Clube

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você;
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->

Desenvolvido uma tabela de clubes, com seus jogos e classificação. O foco do projeto foi no back-end, e integração com front-end.

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

No desenvolvimento do `TFC`, o objetivo era desenvolver uma API (utilizando o método `TDD`) e também integrar _- através do docker-compose -_ as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, foi construído **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento **respeitou as regras de negócio** providas no projeto e **sua API foi capaz de ser consumida por um front-end já provido nesse projeto**.

Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema

<br>

## Habilidades

<br>

Neste projeto, fui capaz de:

- Criar CRUD usando banco de dados MySQL com Sequelize

- Usar a metodologia de TDD

- Aplicar conhecimento de Typescript

- Integrar back-end e front-end

- Preparar projeto para rodar utilizando docker/docker-compose

- Usar a ferramenta JWT para autenticação usando um token.

- Utilizar a ferramente brcrypt para criptografar a senha a ser guardada no banco de dados.

  <br>

## Entendendo a estrutura do Projeto

<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**

- Um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
- Tem o papel de fornecer dados para o serviço de _backend_.
- Durante a execução vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
- Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**

- Roda na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;

3️⃣ **Front-end:**

- Acesso através de `http://localhost:3000/`;
- O front se comunica com serviço de back-end pela url `http://localhost:3001`

4️⃣ **Docker:**

- O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`

<br>

## Se desejar rodar o repositório localmente

<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

- Sistema Operacional Distribuição Unix
- Node versão 16
- Docker
- Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:

- Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
- Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
  - `nvm install 16.14 --lts`
  - `nvm use 16.14`
  - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:

- Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

<br>

### Para rodar o projeto

1. Clone o repositório

- Use o comando: `git clone git@github.com:brunotomaz-dev/TFC-Trybe-Futebol-Clube.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd TFC-Trybe-Futebol-Clube`

2. Instale as dependências na app

- `npm install`.

3. Rode o docker-compose - na pasta app

- `npm run compose:up`.

4. O servidor back-end deve ser inicializado no comando anterior. A página da aplicação deve abrir automaticamente. Para acessar manualmente a página da aplicação entre em `http://localhost:3000/` no seu navegador.

5. Na página de login acesse como

- administrador: Usuário: Admin, Email: admin@admin.com, Senha: secret_adm,
- user: Usuário: User, Email: user@user.com, Senha: secret_user

Obs. Caso precise inicializar o back-end manualmente, na pasta do back-end rode `npm start`
