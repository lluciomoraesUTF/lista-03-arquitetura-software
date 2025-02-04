export default class Pedido {
    //Constructor da classe pedigo que recebe os objetos catalogo e pagamento
    constructor(Catalogo, pagamento) {
        this.Catalogo = Catalogo;
        this.pagamento = pagamento;
        this.orders = [];
    }

    createOrder(usuario, produtoId, quantidade) {
        //Cria um pedido. Recebendo os parâmetros de usuario, produtoID e quantidade
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