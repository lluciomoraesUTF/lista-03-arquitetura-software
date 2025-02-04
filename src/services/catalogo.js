export default class Catalogo {
    constructor() {
        this.produtos = {
            "1": { name: "Laser de Gato", price: 10.0, stock: 5 },
            "2": { name: "Comida para Peixe", price: 20.0, stock: 10 },
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