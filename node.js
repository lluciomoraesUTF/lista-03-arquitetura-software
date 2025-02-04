import express from 'express';

const app = express();

import Autenticacao from './src/services/autenticacao.js';
import Catalogo from './src/services/catalogo.js';
import Pagamento from './src/services/pagamento.js';
import Pedido from './src/services/pedido.js';

import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Instâncias dos serviços
const authService = new Autenticacao();
const catalogo = new Catalogo();
const pagamento = new Pagamento();
const pedido = new Pedido(catalogo, pagamento);

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function menu(){
    console.log("\n============= MENU =============\n");
    console.log("Escolha uma opção: ");
    console.log("1 - Login");
    console.log("2 - Sair");

    let opcao = await askQuestion("Escolha uma opção: ");
    opcao = parseInt(opcao);

    if(opcao != 1 && opcao != 2){
        console.log("\nOpção Inválida!\n");
    }


    return parseInt(opcao);
}

async function main() {
    console.log("Bem-vindo ao Sistema de Gerenciamento de Pedidos!");

    let opcao = 0;
    while(opcao != 2){
        opcao = await menu();

        if(opcao == 1){
            const usuario = await askQuestion("Digite seu nome de usuário: ");
            const password = await askQuestion("Digite sua senha: ");
            if (!authService.login(usuario, password)) {
                rl.close();
                return;
            }

            catalogo.listprodutos();
            const produtoId = await askQuestion("Digite o ID do produto que deseja comprar: ");
            const quantidade = parseInt(await askQuestion("Digite a quantidade desejada: "), 10);

            pedido.createOrder(usuario, produtoId, quantidade);
        }
    }

    console.log("Encerrando sistema de pedidos!");

    rl.close();
}

const PORT = 3000;

app.listen(PORT, () => {
    main();
});