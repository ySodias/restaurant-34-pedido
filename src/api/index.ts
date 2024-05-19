import PedidoController from "../controllers/PedidoController";
import PagamentoRestApi from "../external/http/PagamentoRestApi";
import PedidoRepository from "../external/repositories/PedidoRepository";
import ProdutosDoPedidoRepository from "../external/repositories/ProdutosDoPedidoRepository";
import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import PedidoRoutes from "./pedido";
import ProdutoRestApi from "../external/http/ProdutoRestApi";

const BASE_URL = "/api";

export class routes {
    private app: Application;
    private prisma: PrismaClient;

    constructor(app: Application, prisma: PrismaClient) {
        this.app = app;
        this.prisma = prisma;
        this.setupRoutes();
    }
    private setupRoutes() {

        const pedidoRepository = new PedidoRepository(this.prisma);
        const produtosDoPedidoRepository = new ProdutosDoPedidoRepository(
            this.prisma
        );
        const pagamentoRestAPI = new PagamentoRestApi();
        const produtoRestAPI = new ProdutoRestApi();
        
        const pedidoController = new PedidoController(
            pedidoRepository,
            produtosDoPedidoRepository,
            pagamentoRestAPI,
            produtoRestAPI
        );
        const pedidoRoutes = new PedidoRoutes(
            this.app,
            pedidoController,
            BASE_URL
        );
        pedidoRoutes.buildRoutes();

    }
}
