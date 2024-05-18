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
exports.PedidoGateway = void 0;
class PedidoGateway {
    constructor(pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }
    createPedido(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoRepository.create(pedido);
        });
    }
    getPedidoById(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoRepository.getPedidoById(idPedido);
        });
    }
    getPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoRepository.getPedidos();
        });
    }
    getPedidosByStatus(idStatusPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoRepository.getPedidosByStatus(idStatusPedido);
        });
    }
    getPedidoByStatusFakeCheckout(statusPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidoRepository.getPedidoByStatusFakeCheckout(statusPedido);
        });
    }
    updatePedido(idPedido, statusPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const atualizaPedido = yield this.pedidoRepository.updatePedido(idPedido, statusPedido);
                return atualizaPedido;
            }
            catch (error) {
                throw new Error(`Erro ao Atualizar Pedido de Id ${idPedido}`);
            }
        });
    }
}
exports.PedidoGateway = PedidoGateway;
