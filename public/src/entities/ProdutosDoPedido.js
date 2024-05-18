"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProdutosDoPedido = void 0;
const validateProdutosDoPedido = (produtosDoPedido) => {
    if (produtosDoPedido.quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    if (produtosDoPedido.valor <= 0) {
        throw new Error("O valor deve ser maior que zero.");
    }
    return true;
};
exports.validateProdutosDoPedido = validateProdutosDoPedido;
