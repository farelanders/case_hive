
  <h3 align="center">Case hive API CRUD</h3>

  <p align="center"><br>
    Projeto de criação de processos HTTP.
      <br><br>
    



<details open="open">
  <summary>Conteúdo</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
    </li>
    <li>
      <a href="#pré-requisitos">Pré-requisitos</a>
    </li>
    <li>
      <a href="#utilizando">Utilizando</a>
      <ul>
        <li><a href="#testes">Testes</a></li>
      </ul>
    </li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>


## Sobre o Projeto

Este projeto tem o objetivo de criar uma API para consultar,  cadastrar e remover objetos no banco de dados(CRUD).

Para isso, foi feita a construção do Backend utilizando as tecnologias MySQL e Node + ExpressJS, além de consultas realizadas no navegador e no Postman.



## Pré-requisitos

⚠️ [Postman](https://www.postman.com/downloads/) ou similar

Se for testar localmente:

⚠️ [VisualCode](https://code.visualstudio.com/download) 
⚠️ [Nodejs](https://nodejs.org/en/download/) 
⚠️ [Docker](https://docs.docker.com/get-docker/) 



## Utilizando

Método 1 - Para usar e testar a API, você acessar o endereço https://rest-api-hive.herokuapp.com/ e rodar os testes indicados abaixo.

Método 2 - De Git Pull nesse repositório:
```sh
   git pull https://github.com/farelanders/case_hive.git
   ```
Crie o banco de dados pelo Docker com o comando:
```sh
   docker run -d --name case_hive -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=case_hive mysql:8.0.25 --default-authentication-plugin=mysql_native_password
   ```
Instale todas as dependências do projeto com o comando:
```sh
   npm install
   ```
Para inicializar o API utilize o comando:
```sh
   npm start
   ```
Rodar os testes indicados abaixo.



### Testes

Com a API em funcionamento, vamos rodar os testes que foram pedidos para o desafio via  Postman (ou algum similar). Estes são os testes:

|           Endpoint          | Operação HTTP |                           Função                          |                                                                                                            Teste                                                                                                           |                                   Exemplo de Body e/ou parâmetro                                  |
|:---------------------------:|:-------------:|:---------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------:|
| /v1/users                   |      POST     |        Registra um novo usuário no banco de dados.        | https://rest-api-hive.herokuapp.com/v1/users ou https://localhost:3000/v1/users (se for testar localmente) Enviar dados no body por JSON                                                                                   | { "name":"Usuario",  "lastname":"Teste",  "nickname":"Teste",  "address":"Rua Teste",  "bio":"" } |
| /v1/users/findbyname/:key         |      GET      | Procura um usuário pelo seu nome e/ou sobrenome.          | https://rest-api-hive.herokuapp.com/v1/users/findbyname/:key ou https://localhost:3000/v1/users/findbyname/:key (se for testar localmente) Utilize os dados para busca no parâmetro :key                                               |                                               Mickey                                              |
| /v1/users/findbynickname/:key     |      GET      | Procura um usuário pelo nickname.                         | https://rest-api-hive.herokuapp.com/v1/users/findbynickname/:key ou  https://localhost:3000/users/v1/findbynickname/:key (se for testar localmente) Utilize os dados para busca no parâmetro :key                                      |                                                Mic                                                |
| /v1/users/alterlastnameadress/:id |      PUT      | Altera o endereço e/ou o sobrenome de um usuário pelo ID. | https://rest-api-hive.herokuapp.com/v1/users/alterlastnameadress/:id ou  https://localhost:3000/v1/users/alterlastnameadress/:id (se for testar localmente) Utilize um ID registrado no parâmetro :id e enviar dados no body por JSON  | body { "lastname":"novo sobrenome",  "address":"novo endereço" }                                  |
| /v1/users/alternickname/:id       |      PUT      | Altera o nickname de um usuário pelo ID.                  | https://rest-api-hive.herokuapp.com/v1/users/alterlastnameadress/:id ou  https://localhost:3000/v1/users/alterlastnameadress/:id (se for testar localmente) Utilize um ID registrado no parâmetro :id e enviar dados no body por JSON  | body { "nickname":"novo nickname" }                                                               |
| /v1/users/:id               |     DELETE    | Remove um usuário do sistema.                             | https://rest-api-hive.herokuapp.com/v1/users/:id Utilize um ID registrado no parâmetro :id                                                                                                                                 |                                                                                                   |                                                                                            |



  

## Contato


Marcos Travagin - [Linkedin](https://linkedin.com/in/marcos-antonio-travagin-41515985) - marcostravagin@outlook.com 

Link do projeto: [https://github.com/farelanders/case_hive](https://github.com/farelanders/case_hive)

