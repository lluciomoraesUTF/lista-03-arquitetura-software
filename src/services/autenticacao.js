export default class Autenticacao {
    //criação de usuários nativos do sistema paros usuários
    constructor() {
        this.users = { "lucio": "lu123", "kauan": "ka123","diego":"di123" };
    }
    //função para autenticação dos usuários
    login(usuario, password) {
        //afere se a senha fornecida pelo user é semelhante à cadastrada na base de dados
        if (this.users[usuario] === password) {
            console.log(`Usuário ${usuario} autenticado com sucesso.`);
            return true;
        } else {
            //retorna se falso caso o usuário não exista ou a senha esteja incorreta
            console.log("Falha na autenticação: usuário ou senha incorretos.");
            return false;
        }
    }
}