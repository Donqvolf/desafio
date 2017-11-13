## Installation
Em resumo, este projeto consiste em implementar a solucão proposta pelo Melhor Envio, no desafio da Melhor Transportadora. Este software foi feito do zero, sem utilizar bases prontas (protótipos), e espero que possa ser útil à todo aquele que precisar calcular fretes e/ou prazos; ou, ao menos, ter uma base ideológica de como o processo funciona, atualmente.

### Softwares necessários
Para que este software rode de forma apropriada, será necessário os seguintes softwares:
- MySQL **v5.7.19**,
- Node.js **v8.9.1**,  
- NPM (que vem com o Node.js).

Ressalto que, infelizmente, o MariaDB não poderá ser utilizado. É obrigatório que seja o próprio MySQL em detrimento de que o MariaDB ainda está em processo de adaptar-se à certos tipos de dados e colunas, como por exemplo, JSON, para determinadas e/ou gerais versões de sistemas operacionais.
  

Caso desejem rodar o projeto de forma isolada, basta instalar também:
- Vagrant,
- VirtualBox.

### Configuracões
As credenciais do banco de dados MySQL deverão ser configuradas **ANTES** de prosseguirmos, no arquivo `config.yml`, na mesma pasta raíz deste projeto.

### Steps para Instalar

1. Executar o comando `npm install` dentro da pasta raíz do projeto;
2. Importar o arquivo `./bootstrap/db/database2.sql` para o seu banco mysql para criar a base, tabelas e dados iniciais;

Feito isso, podemos iniciar o software usando: `npm start`  
Deverá aparecer na tela do console, em seguida, o link para acessar no seu navegador.
  
#### Os principais pacotes npm utilizados foram:
- `express` para controle de roteamento e servir arquivos;
- `mysql2/promise` para conexão eficiente ao banco de dados;
- `helmet` para tornar mais seguro os requests do express, adicionando headers específicos;
- `axios` para realizar requests de HTTP;
- `body-parser` para processar dados de pedidos express e compilar o JSON, quando necessário.

## Postman
A rota de cálculo **(API)** do projeto estarão disponíveis, com exemplos salvos, descricão de cada parâmetro de forma minuciosa, na seguinte Collection do Postman, acessível pelo link: 


## Vagrant

Caso você queira executar o projeto de forma isolada, dentro de uma máquina virtual Linux que já instala tudo que é necessário, de forma automática, bastará seguir os passos abaixo (tendo Vagrant e VirtualBox instalados):
- Executar `vagrant up` dentro da pasta raíz do projeto, para iniciar ou criar a VM do projeto;
- Após finalizar tudo de forma sucedida, entrar na vagrant usando `vagrant ssh`;
- Dentro da VM, o usuário e senha do MySQL são `root`, por padrão - configure-os no config.yml, caso necessário;
- Os steps de instalar pacotes, importar banco de dados e dar start são os mesmos descritos no "Steps para Instalar".
  
**Detalhe**: O Vagrant pode apresentar falhas sem razão iminente; por exemplo, em meu sistema operacional **(Arch Linux)**, ele frequentemente apresenta falhas onde tenho que reinstalar plugins e outras APIs. Portanto, caso identifique tal comportamento ao realizar o processo com a Vagrant, sugiro deixá-la de lado e testar em seu próprio ambiente local, fora de maquinas virtuais.

## LICENSE
Este projeto está licenciado com MIT e pode ser utilizado por qualquer entidade, de forma ética, desde que siga os termos exatos exigidos pela licenca MIT.

## Credits
Copyright (c) 2017 João Pedro Viana (<snider@degiant.com.br>)  
Telegram: <https://t.me/Donqvolf> | Facebook: <https://fb.com/Donqvolf>