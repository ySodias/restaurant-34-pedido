import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import { IProdutoDoPedidoGateway } from "@/interfaces";
import mockProdutosDoPedidoRepository from "./mocks/MockProdutoDoPedidoRepository";


describe("Produto Do Pedido", () => {
    let produtoDoPedidoGateway: IProdutoDoPedidoGateway;

    beforeAll(async () => {
        produtoDoPedidoGateway = new ProdutoDoPedidoGateway(mockProdutosDoPedidoRepository);
    });


    it("createProdutosDoPedido", async () => {

        const produto2: ProdutosDoPedido =
            {
                id: 1,
                produtoId: 1,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
                createdAt: new Date,
                updatedAt: new Date
            } as ProdutosDoPedido

        const produtoDoPedidoCriado: any = await produtoDoPedidoGateway.createProdutosDoPedido([produto2]);

        expect(produtoDoPedidoCriado).toBeDefined();
    });


    it("deleteProdutosDoPedido", async () => {

        const produto2: ProdutosDoPedido =
            {
                id: 1,
                produtoId: 1,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
                createdAt: new Date,
                updatedAt: new Date
            } as ProdutosDoPedido

        const produtoDoPedidoDeletado: any = await produtoDoPedidoGateway.deleteProdutosDoPedido([produto2]);

        expect(produtoDoPedidoDeletado).toBeDefined();
    });

    it("getProdutosDoPedido", async () => {

        const getProdutosDoPedido: any = await produtoDoPedidoGateway.getProdutosDoPedido(1);

        expect(getProdutosDoPedido).toBeDefined();
    });


})


