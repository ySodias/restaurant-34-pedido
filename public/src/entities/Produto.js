"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoImpl = void 0;
class ProdutoImpl {
    constructor(id, descricao, preco, categoriaProdutoId, produtosDoCardapio, produtosDoPedido, categoriaProduto, createdAt, updatedAt) {
        this.id = id;
        this.descricao = descricao;
        this.preco = preco;
        this.categoriaProdutoId = categoriaProdutoId;
        this.produtosDoCardapio = produtosDoCardapio;
        this.produtosDoPedido = produtosDoPedido;
        this.categoriaProduto = categoriaProduto;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.ProdutoImpl = ProdutoImpl;
