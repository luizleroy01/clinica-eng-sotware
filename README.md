# clinica-eng-sotware

## Utilização
Para executar o projeto deve-se executar separadamente o backend e o front , sendo assi para o bak deve-se:
>cd backend-clinica

>npm i

>npx nodemon server.js

Em seguida deve-se executar o projeto do frontend da seguinte forma

> cd frontend-clinica

>npm i

>npm run dev

Para a integraçãodo frontend com o backend do do projeto há um arquivo no projeto do frontend chamado **configuration.js** no caminho:

>./frontend-clinica/src/configuration.js

Vale ressaltar que no momento da gravação do vídeo apenas integração entre a rota de cadastro de endereço está funcionando

## Decisões de projeto
Sobre essas decisões utilizanos para o front end react para deixar a aplicação mais reativa e dinâmica e, para o backend utilizamos node js pois nos permite um backend leve e consistente no qual utilizamos o banco de dados embutido sqlite