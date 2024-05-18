"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagamento {
    constructor(id, realizado, tipo, data, valor, pedido, statusPagamentoId, statusPagamento, pedidoId, createdAt, updatedAt) {
        this.id = id;
        this.realizado = realizado;
        this.tipo = tipo;
        this.data = data;
        this.valor = valor;
        this.pedido = pedido;
        this.statusPagamentoId = statusPagamentoId;
        this.statusPagamento = statusPagamento;
        this.pedidoId = pedidoId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.default = Pagamento;
