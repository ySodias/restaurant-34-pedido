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
class PedidoRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    create(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const creationResponse = yield this.prismaClient.pedido.create({
                    data: {
                        statusPedidoId: pedido.statusPedidoId,
                        clienteId: pedido.clienteId,
                    },
                });
                return creationResponse;
            }
            catch (error) {
                console.error("Erro ao criar pedido:", error);
                throw new Error("Erro ao criar pedido.");
            }
        });
    }
    getPedidoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedido = yield this.prismaClient.pedido.findUnique({
                    where: {
                        id: id,
                    },
                });
                return pedido;
            }
            catch (error) {
                console.error("Erro ao buscar pedido:", error);
                throw new Error("Erro ao buscar pedido.");
            }
        });
    }
    getPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedidosSemConverter = yield this.prismaClient.pedido.findMany({
                    include: {
                        statusPedido: {
                            select: {
                                id: true,
                                enumerador: true,
                            },
                        },
                        cliente: {
                            select: {
                                nome: true,
                            },
                        },
                    },
                });
                const pedidosUnknown = pedidosSemConverter;
                const pedidosConvertidos = pedidosUnknown;
                return pedidosConvertidos;
            }
            catch (error) {
                console.error("Erro ao buscar pedidos:", error);
                throw new Error("Erro ao buscar pedidos.");
            }
        });
    }
    getPedidosByStatus(idStatusPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedidosSemConverter = yield this.prismaClient.pedido.findMany({
                    where: {
                        statusPedido: {
                            id: idStatusPedido,
                        },
                    },
                    include: {
                        cliente: {
                            select: {
                                nome: true,
                            },
                        },
                        statusPedido: {
                            select: {
                                enumerador: true,
                            },
                        },
                    },
                });
                const pedidosUnknown = pedidosSemConverter;
                const pedidosConvertidos = pedidosUnknown;
                return pedidosConvertidos;
            }
            catch (error) {
                console.error("Erro ao buscar pedidos por status:", error);
                throw new Error("Erro ao buscar pedidos por status.");
            }
        });
    }
    getPedidoByStatusFakeCheckout(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedidosSemConverter = yield this.prismaClient.pedido.findMany({
                    where: {
                        statusPedido: {
                            enumerador: {
                                startsWith: status,
                            },
                        },
                    },
                    include: {
                        cliente: {
                            select: {
                                nome: true,
                            },
                        },
                        statusPedido: {
                            select: {
                                enumerador: true,
                            },
                        },
                    },
                });
                const pedidosUnknown = pedidosSemConverter;
                const pedidosConvertidos = pedidosUnknown;
                return pedidosConvertidos;
            }
            catch (error) {
                console.error("Erro ao buscar pedidos por status:", error);
                throw new Error("Erro ao buscar pedidos por status.");
            }
        });
    }
    updatePedido(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedidoResponse = yield this.prismaClient.pedido.update({
                    where: {
                        id: id,
                    },
                    data: {
                        statusPedido: {
                            connect: {
                                enumerador: status,
                            },
                        },
                    },
                });
                return pedidoResponse;
            }
            catch (error) {
                console.error("Erro ao buscar pedidos por status:", error);
                throw new Error("Erro ao buscar pedidos por status.");
            }
        });
    }
}
exports.default = PedidoRepository;
