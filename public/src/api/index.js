"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const PedidoRepository_1 = __importDefault(require("@/external/repositories/PedidoRepository"));
const PedidoController_1 = __importDefault(require("@/controllers/PedidoController"));
const pedido_1 = __importDefault(require("./pedido"));
const ProdutosDoPedidoRepository_1 = __importDefault(require("@/external/repositories/ProdutosDoPedidoRepository"));
const BASE_URL = "/api";
class routes {
    constructor(app, prisma) {
        this.app = app;
        this.prisma = prisma;
        this.setupRoutes();
    }
    setupRoutes() {
        const pedidoRepository = new PedidoRepository_1.default(this.prisma);
        const produtosDoPedidoRepository = new ProdutosDoPedidoRepository_1.default(this.prisma);
        const pedidoController = new PedidoController_1.default(pedidoRepository, produtosDoPedidoRepository);
        const pedidoRoutes = new pedido_1.default(this.app, pedidoController, BASE_URL);
        pedidoRoutes.buildRoutes();
    }
}
exports.routes = routes;
