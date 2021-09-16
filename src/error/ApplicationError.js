class ApplicationError {
    mensagem;
    httpStatusCode;

    constructor(mensagem, httpStatusCode) {
        this.mensagem = mensagem,
        this.httpStatusCode = httpStatusCode
    }

    getMensagens() {
        return this.mensagem;
    }

    getHttpStatusCode() {
        return this.httpStatusCode;
    }
}

module.exports = {
    ApplicationError
};