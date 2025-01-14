
<p align="center">
  <img src="https://github.com/Fiap-FSD/tech-2/blob/development/src/pos-tech.png" width="400" /></a>
</p>


<p align="center">
  <img src="https://github.com/Fiap-FSD/tech-2/blob/development/Fiap-logo.jpg" width="300" /></a>
</p>



# Refatoração do Back-End do Blog Post

Este documento descreve o processo de desenvolvimento do refatoramento da parte Back-End do blog post. A aplicação foi inicialmente desenvolvida utilizando a plataforma OutSystems. Para esta nova etapa, o back-end da aplicação foi refatorado utilizando Node.js, REST APIs, GitHub, Docker e MongoDB para persistência de dados.

Será apresentada a maneira de execução de cada step do projeto contendo informações cruciais sobre como configurar, usar e contribuir com o projeto.

## Objetivos do Projeto
* Refatorar o back-end da aplicação de blogging para professores utilizando Node.js.
* Implementação de uma API RESTful com endpoints definidos para a criação, leitura, edição, exclusão e busca de postagens.
* Utilizar MongoDB como banco de dados para persistência dos dados.
* Utilizar Docker para garantir consistência, escalabilidade e facilitar o deploy do projeto.


## Ferramentas Utilizadas
A equipe utilizou as seguintes ferramentas durante o desenvolvimento do projeto:

* Visual Studio Code: Ferramenta utilizada para escrita e execução de código, com extensões específicas para JavaScript e Node.js. Sua integração com o terminal permite rodar o servidor diretamente dentro do editor, facilitando o desenvolvimento, testes e depuração de endpoints.

* GitHub: O GitHub ofereceu controle de versão, permitindo que cada membro da equipe trabalhasse em diferentes funcionalidades sem afetar o código principal. A utilização de pull requests facilitou a revisão de código e a integração das mudanças, garantindo qualidade e consistência. O GitHub também integrou ferramentas de CI/CD, automatizando testes e o deploy do código.

* MongoDB: O banco de dados NoSQL foi escolhido por sua flexibilidade e integração com Node.js através de bibliotecas como o Mongoose, permitindo uma maneira dinâmica de armazenar dados.

* Docker: O Docker permitiu o empacotamento da aplicação e suas dependências em contêineres, garantindo consistência entre os ambientes de desenvolvimento e produção. O Docker Hub foi utilizado para armazenar e compartilhar as imagens dos contêineres.

# Como rodar o projeto

## Pré-requisitos

* Node.js instalado (versão recomendada: 16.x ou superior).
* Docker instalado.
* MongoDB rodando localmente ou utilizando uma instância em nuvem.

## Passos:

#### Clone este repositório:
```bash
git clone https://github.com/Fiap-FSD/tech-2.git
cd tech-2
```

#### Instale as dependências:

```bash
npm install
```

#### Configure o MongoDB:

Configure a URL do banco de dados MongoDB no arquivo de configuração do projeto.

#### Execute o servidor localmente:

```bash
npm start
```

#### Rodando com Docker:

Para construir e rodar a aplicação com Docker, utilize os seguintes comandos:

```bash
docker build -t nome-da-imagem .
docker run -p 3000:3000 nome-da-imagem
docker pull fiapfsd/blog-posts
```

## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```
