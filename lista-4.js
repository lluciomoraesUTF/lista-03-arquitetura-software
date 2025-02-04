const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class AuthenticationService {
    constructor() {
        this.users = { "user1": "password1", "user2": "password2" };
    }

    login(username, password) {
        if (this.users[username] === password) {
            console.log(`Usuário ${username} autenticado com sucesso.`);
            return true;
        } else {
            console.log("Falha na autenticação: usuário ou senha incorretos.");
            return false;
        }
    }
}

class ProductCatalogService {
    constructor() {
        this.products = {
            "prod1": { name: "Produto 1", price: 10.0, stock: 5 },
            "prod2": { name: "Produto 2", price: 20.0, stock: 10 },
        };
    }

    getProduct(productId) {
        const product = this.products[productId];
        if (product) {
            console.log(`Produto encontrado: ${product.name} - Preço: ${product.price}`);
            return product;
        } else {
            console.log("Produto não encontrado.");
            return null;
        }
    }

    checkStock(productId, quantity) {
        const product = this.products[productId];
        if (product && product.stock >= quantity) {
            return true;
        } else {
            console.log(`Estoque insuficiente para o produto ${productId}.`);
            return false;
        }
    }

    listProducts() {
        console.log("Catálogo de Produtos:");
        for (const [id, product] of Object.entries(this.products)) {
            console.log(`${id}: ${product.name} - R$ ${product.price} (Estoque: ${product.stock})`);
        }
    }
}

class OrderService {
    constructor(productCatalogService, paymentService) {
        this.productCatalogService = productCatalogService;
        this.paymentService = paymentService;
        this.orders = [];
    }

    createOrder(username, productId, quantity) {
        const product = this.productCatalogService.getProduct(productId);
        if (product && this.productCatalogService.checkStock(productId, quantity)) {
            const total = product.price * quantity;
            const order = { username, productId, quantity, total, status: "pendente" };
            this.orders.push(order);
            console.log(`Pedido criado: ${JSON.stringify(order)}`);
            this.paymentService.processPayment(order);
        } else {
            console.log("Falha ao criar pedido.");
        }
    }
}

// Serviço de Pagamentos
class PaymentService {
    processPayment(order) {
        console.log(`Processando pagamento para o pedido: ${JSON.stringify(order)}`);
        // Simulação de falha de pagamento (50% de chance)
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
const authService = new AuthenticationService();
const productCatalogService = new ProductCatalogService();
const paymentService = new PaymentService();
const orderService = new OrderService(productCatalogService, paymentService);

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    console.log("Bem-vindo ao Sistema de Gerenciamento de Pedidos!");

    const username = await askQuestion("Digite seu nome de usuário: ");
    const password = await askQuestion("Digite sua senha: ");
    if (!authService.login(username, password)) {
        rl.close();
        return;
    }

    productCatalogService.listProducts();
    const productId = await askQuestion("Digite o ID do produto que deseja comprar: ");
    const quantity = parseInt(await askQuestion("Digite a quantidade desejada: "), 10);

    orderService.createOrder(username, productId, quantity);

    rl.close();
}

main();