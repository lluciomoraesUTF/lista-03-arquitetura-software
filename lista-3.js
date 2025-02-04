const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Autenticacao {
    constructor() {
        this.users = { "Lucio": "lu123", "kauan": "ka123" };
    }

    login(usuario, password) {
        if (this.users[usuario] === password) {
            console.log(`Usuário ${usuario} autenticado com sucesso.`);
            return true;
        } else {
            console.log("Falha na autenticação: usuário ou senha incorretos.");
            return false;
        }
    }
}

class Catalogo {
    constructor() {
        this.produtos = {
            "prod1": { name: "Laser de Gato", price: 10.0, stock: 5 },
            "prod2": { name: "Produto 2", price: 20.0, stock: 10 },
        };
    }

    getproduto(produtoId) {
        const produto = this.produtos[produtoId];
        if (produto) {
            console.log(`Produto encontrado: ${produto.name} - Preço: ${produto.price}`);
            return produto;
        } else {
            console.log("Produto não encontrado.");
            return null;
        }
    }

    checkStock(produtoId, quantidade) {
        const produto = this.produtos[produtoId];
        if (produto && produto.stock >= quantidade) {
            return true;
        } else {
            console.log(`Estoque insuficiente para o produto ${produtoId}.`);
            return false;
        }
    }

    listprodutos() {
        console.log("Catálogo de Produtos:");
        for (const [id, produto] of Object.entries(this.produtos)) {
            console.log(`${id}: ${produto.name} - R$ ${produto.price} (Estoque: ${produto.stock})`);
        }
    }
}

class Pedido {
    constructor(Catalogo, pagamento) {
        this.Catalogo = Catalogo;
        this.pagamento = pagamento;
        this.orders = [];
    }

    createOrder(usuario, produtoId, quantidade) {
        const produto = this.Catalogo.getproduto(produtoId);
        if (produto && this.Catalogo.checkStock(produtoId, quantidade)) {
            const total = produto.price * quantidade;
            const order = { usuario, produtoId, quantidade, total, status: "pendente" };
            this.orders.push(order);
            console.log(`Pedido criado: ${JSON.stringify(order)}`);
            this.pagamento.processPayment(order);
        } else {
            console.log("Falha ao criar pedido.");
        }
    }
}

class pagamento {
    processPayment(order) {
        console.log(`Processando pagamento para o pedido: ${JSON.stringify(order)}`);
        const paymentSuccess = Math.random() > 0.5;
        if (paymentSuccess) {
            order.status = "pago";
            console.log("Pagamento aprovado. Status do pedido: pago.");
        } else {
            order.status = "pendente";
            console.log("Pagamento falhou. Status do pedido: pendente.");
        }
    }
}

// Instâncias dos serviços
const authService = new Autenticacao();
const Catalogo = new Catalogo();
const pagamento = new pagamento();
const Pedido = new Pedido(Catalogo, pagamento);

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    console.log("Bem-vindo ao Sistema de Gerenciamento de Pedidos!");

    const usuario = await askQuestion("Digite seu nome de usuário: ");
    const password = await askQuestion("Digite sua senha: ");
    if (!authService.login(usuario, password)) {
        rl.close();
        return;
    }

    Catalogo.listprodutos();
    const produtoId = await askQuestion("Digite o ID do produto que deseja comprar: ");
    const quantidade = parseInt(await askQuestion("Digite a quantidade desejada: "), 10);

    Pedido.createOrder(usuario, produtoId, quantidade);

    rl.close();
}

main();