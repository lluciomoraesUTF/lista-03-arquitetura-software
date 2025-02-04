export default class Autenticacao {
    constructor() {
        this.users = { "lucio": "lu123", "kauan": "ka123" };
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