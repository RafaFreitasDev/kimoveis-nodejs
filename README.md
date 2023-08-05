# KImóveis 

# PARA RODAR O PROJETO

## Requisitos

- Ter o Node instalado
- Ter o nmp instalado (gerenciador de pacotes)

## Informações

- Database: Banco de Dados em PostgreSQL (PSQL), sistema gerenciador de banco de dados relacional de código aberto, altamente confiável e escalável. Ele é amplamente utilizado em projetos web e aplicativos empresariais devido à sua capacidade de lidar com grandes volumes de dados e sua conformidade com os padrões SQL.

- Arquivo .env: Existe um arquivo **.env.example** na pasta matriz do projeto com 2 variáveis de ambiente dentro dele:

  - **DATABASE_URL = "postgres://(user):(password)@(host):(port)/(database)"**
  - **SECRET_KEY =**

  este arqivo deve-se transformar-se em **.env** e deve-se substituir as informações entre **( )**, com as informações do psql do desenvolverdor e preencher a variável **SECRET_KEY =**

## Fazer os seguintes comandos

npm install (para instalar dependencias)

npm run typeorm migration:run -- -d src/data-source (para rodar as migrations)

npm run dev (para iniciar o servidor)

## Endpoints:

| Método | Endpoint                   | Responsabilidade                                  | Autenticação                           |
| ------ | -------------------------- | ------------------------------------------------- | -------------------------------------- |
| POST   | /users                     | Criação de usuário                                | Qualquer usuário, não necessita token  |
| GET    | /users                     | Lista todos os usuários                           | Apenas Admnistradores                  |
| PATCH  | /users/:id                 | Atualiza um usuário                               | Apenas Admnistradores ou dono da conta |
| DELETE | /users/:id                 | Realiza um soft delete no usuário                 | Apenas Admnistradores                  |
| POST   | /login                     | Gera o token de autenticação                      | Qualquer usuário, não necessita token  |
| POST   | /categories                | Criação de categoria                              | Apenas Admnistradores                  |
| GET    | /categories                | Lista todas as categorias                         | Qualquer usuário, não necessita token  |
| GET    | /categories/:id/realEstate | Lista todos imóveis que pertencem a uma categoria | Qualquer usuário, não necessita token  |
| POST   | /realEstate                | Criação de um imóvel                              | Apenas Admnistradores                  |
| GET    | /realEstate                | Lista todos os imóveis                            | Qualquer usuário, não necessita token  |
| POST   | /schedules                 | Agenda uma visita a um imóvel                     | Qualquer usuário, obrigatório token    |
| GET    | /schedules/realEstate/:id  | lista todos os agendamentos de um imóvel          | Apenas Admnistradores                  |

