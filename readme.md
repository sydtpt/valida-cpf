# Aplicação para validação de CPFs em uma blacklist

Aplicação construida utilizando NodeJS com typescript para as API's e Angular 8 para visualização dos dados.

## Pŕe-requisitos:
Para execução é necessário ter o NodeJS 8 ou superior, docker e o docker-compose instalados localmente.

## Execução
Para executar o projeto executar o comando no diretório raiz(diretório onde esta o arquivo docker-compose.yml):
$ docker-compose build --no-cache
Após a construção dos contêineres, executar o comando abaixo para inicializa-los:
$ docker-compose up.

O client da aplicação pode ser acessado via browser pelo endereço:
http://localhost:8181

Para realizar chamadas diretamente para as API's, utilizar o endereço:
http://localhost:5000


## API's disponíveis:

### GET /status
Disponibiliza informações do servidor como: Hora de inicilização, total consultas consultas a CPF's ja realizadas e o total de CPFs bloqueados no momento.

### GET /consulta
Retorna se o CPF esta na blacklist ou não. É necessário informar o queryparam cpf como no exemplo abaixo:
/consulta?cpf=12345678901

### GET /cpf
Retorna a lista de todos os CPFs bloqueados com a data do bloqueio.

### POST /cpf
Inclui um cpf na blacklist. é necessário enviar no body o cpf como no exemplo abaixo:
{
    cpf: "12345678901"
}

### DELETE /cpf/:cpfNumber
Remove um cpf na blacklist. é necessário enviar o cpf como pathParam como no exemplo abaixo:
/cpf/12345678901

## Iniciando aplicações individualmente

### Front
Para editar o front da aplicação, basta acessar a pasta /front e digitar os comandos abaixo:
$ npm i && ng serve.

### Node API's
Para editar a aplicação backend, acesse a pasta /server e digite o comando abaixo:
$ npm i

Após a instalação das dependências, é necessário alterar o endereço do banco de dados para um endereço onde a aplicação possa se conectar.
Altere a linha:
mongoose.connect(`mongodb://database/cpf`);
para :
mongoose.connect(`mongodb://endereço-do-mongodb/nome_do_banco`);

Após as alterações, execute o comando abaixo para iniciar a aplicação:
$ npm run dev

### Testes
TO-DO
