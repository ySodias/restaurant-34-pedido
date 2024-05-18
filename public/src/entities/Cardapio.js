"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cardapio {
    constructor(id, produtosDoCardapio, descricao, ativo, createdAt, updatedAt) {
        this.id = id;
        this.produtosDoCardapio = produtosDoCardapio;
        this.descricao = descricao;
        this.ativo = ativo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.default = Cardapio;
