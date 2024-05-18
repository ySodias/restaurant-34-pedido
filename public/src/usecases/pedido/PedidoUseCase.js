"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnumStatusPedido_1 = require("@/enums/EnumStatusPedido");
class PedidoUseCase {
    constructor(produtosDoPedidoGateway, pedidoGateway) {
        this.produtosDoPedidoGateway = produtosDoPedidoGateway;
        this.pedidoGateway = pedidoGateway;
    }
    executeCreation(pedidoData) {
        return __awaiter(this, void 0, void 0, function* () {
            pedidoData.statusPedidoId = EnumStatusPedido_1.EnumStatusPedido.RECEBIDO.id;
            const pedidoCriado = yield this.pedidoGateway.createPedido(pedidoData);
            return pedidoCriado;
        });
    }
    executeGetPedidoById(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoGateway.getPedidoById(idPedido);
        });
    }
    executeGetPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidos = yield this.pedidoGateway.getPedidos();
            const pedidosOrdenados = this.orderPedidos(pedidos);
            return pedidosOrdenados;
        });
    }
    executeGetPedidosByStatus(idStatusPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoGateway.getPedidosByStatus(idStatusPedido);
        });
    }
    executeGetPedidoFakeCheckout(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoGateway.getPedidoByStatusFakeCheckout(status);
        });
    }
    executeAddProdutosAoPedido(produtosDoPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.produtosDoPedidoGateway.createProdutosDoPedido(produtosDoPedido);
        });
    }
    executeRemoveProdutoDoPedido(idPedido, idProdutos) {
        throw new Error("Method executeRemoveProdutoAoPedido not implemented.");
    }
    executeDelete(id) {
        throw new Error("Method executeDelete not implemented.");
    }
    executeUpdatePedidoFinalizado(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.pedidoGateway.updatePedido(idPedido, "Finalizado");
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    executeUpdatePedidoPreparacao(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.pedidoGateway.updatePedido(idPedido, "Em preparação");
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    executeUpdatePedidoPronto(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.pedidoGateway.updatePedido(idPedido, "Pronto");
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    executeGetProdutoDoPedido(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtosDoPedido = yield this.produtosDoPedidoGateway.getProdutosDoPedido(idPedido);
                return produtosDoPedido;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Erro ao buscar Produtos do Pedido ${idPedido}`);
            }
        });
    }
    orderPedidos(pedidos) {
        const pedidosEmPreparacao = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido_1.EnumStatusPedido.EM_PREPARACAO.id);
        const pedidosPronto = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido_1.EnumStatusPedido.PRONTO.id);
        const pedidosRecebido = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido_1.EnumStatusPedido.RECEBIDO.id);
        return [...pedidosPronto, ...pedidosEmPreparacao, ...pedidosRecebido];
    }
}
exports.default = PedidoUseCase;
