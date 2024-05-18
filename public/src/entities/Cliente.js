"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor(pedido, usuarioId, usuario, nome, email, cpf, createdAt, updatedAt) {
        this.usuario = {
            login: "",
            senha: "",
        };
        this.pedido = pedido;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.createdAt = createdAt;
        this.usuario = usuario;
        this.updatedAt = updatedAt;
        this.usuarioId = usuarioId;
    }
}
exports.default = Cliente;
