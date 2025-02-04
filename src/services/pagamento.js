export default class Pagamento {
    //Processa o Pagamento
    processPayment(order) {
        console.log(`Processando pagamento para o pedido: ${JSON.stringify(order)}`);
        //Simula pagamentos aprovados e nao aprovados. Cada pedido tem 60% de chance de ser aprovado e 40% de chance de falhar.
        const paymentSuccess = Math.random() > 0.4;
        if (paymentSuccess) {
            order.status = "pago";
            console.log("Pagamento aprovado. Status do pedido: pago.");
        } else {
            order.status = "pendente";
            console.log("Pagamento falhou. Status do pedido: pendente.");
        }
    }
}