export default class Pagamento {
    processPayment(order) {
        console.log(`Processando pagamento para o pedido: ${JSON.stringify(order)}`);

        //Simula pagamentos aprovados e nao aprovados. Cada pedido tem 50% de chance de ser aprovado ou falho.
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