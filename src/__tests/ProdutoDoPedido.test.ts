import { Pedido } from "@/entities/Pedido";
import { Produto } from "@/entities/Produto";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import StatusPedido from "@/entities/StatusPedido";
import { PedidoGateway } from "@/gateways/pedido";
import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import { IPedidoGateway, IProdutoDoPedidoGateway } from "@/interfaces";
import exp from "constants";
import mockPedidoRepository from "./mocks/MockPedidoRepository";
import mockProdutoDoPedidoGateway from "./mocks/MockProdutoDoPedidoGateway";
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
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido

        const produtoDoPedidoCriado: any = await produtoDoPedidoGateway.createProdutosDoPedido([produto2]);

        expect(produtoDoPedidoCriado).toBeDefined();
    });


    it("deleteProdutosDoPedido", async () => {

        const produto2: ProdutosDoPedido =
            {
                id: 1,
                produtoId: 1,
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido

        const produtoDoPedidoDeletado: any = await produtoDoPedidoGateway.deleteProdutosDoPedido([produto2]);

        expect(produtoDoPedidoDeletado).toBeDefined();
    });

    it("getProdutosDoPedido", async () => {

        const getProdutosDoPedido: any = await produtoDoPedidoGateway.getProdutosDoPedido(1);

        expect(getProdutosDoPedido).toBeDefined();
    });


})


