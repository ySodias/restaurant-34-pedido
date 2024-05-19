
import { Pedido } from "@/entities/Pedido";
import StatusPedido from "@/entities/StatusPedido";
import { Produto } from "@/entities/Produto";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import mockProdutosDoPedidoRepository from "./mocks/MockProdutoDoPedidoRepository";
import { IProdutoDoPedidoGateway, IProdutosDoPedidoRepository } from "@/interfaces";
import mockProdutoDoPedidoGateway from "./mocks/MockProdutoDoPedidoGateway";
import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";

describe("Produto do pedido gateway", () => {
    let produtosDoPedidoGateway: IProdutoDoPedidoGateway = mockProdutoDoPedidoGateway;

    

    it("create", async () => {

        const produto1 =
            {
                id: 1,
                produtoId: 1,
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido

        const produto2 = 
            {
                id: 2,
                produtoId: 2,
                produto: { id: 2, nome: "Produto 2", preco: 15 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
            } as ProdutosDoPedido
        

        const produtoDoPedido: any = await produtosDoPedidoGateway.createProdutosDoPedido([produto1, produto2]);

        expect(produtoDoPedido).toBeDefined();
    })

    it("delete", async () => {

        const produto1 =
            {
                id: 1,
                produtoId: 1,
                produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
            } as ProdutosDoPedido

        const produto2 = 
            {
                id: 2,
                produtoId: 2,
                produto: { id: 2, nome: "Produto 2", preco: 15 } as unknown as Produto,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
            } as ProdutosDoPedido
        

        const produtoDoPedido: any = await produtosDoPedidoGateway.deleteProdutosDoPedido([produto1, produto2]);

        expect(produtoDoPedido).toBeDefined();
    })

    it("get", async () => {
        const produtosDoPedido: any = await produtosDoPedidoGateway.getProdutosDoPedido(2);

        expect(produtosDoPedido).toBeDefined();
    })

    it("executa remove produto do pedido", async () => {
        const produtosDoPedido: any = await produtosDoPedidoGateway.executeRemoveProdutoDoPedido(1, 2);

        expect(produtosDoPedido).toBeDefined();
    })

    it("remove produto do pedido", async () => {
        const produtosDoPedido: any = await produtosDoPedidoGateway.removeProdutoDoPedido(1, 2);

        expect(produtosDoPedido).toBeUndefined();
    })

    it("get", async () => {
        const produtosDoPedido: any = await produtosDoPedidoGateway.getProdutosDoPedido(1);

        expect(produtosDoPedido).toBeDefined();
    })

    it("create produtos do pedido", async () => {

        const produto1 =
        {
            id: 1,
            produtoId: 1,
            produto: { id: 1, nome: "Produto 1", preco: 10 } as unknown as Produto,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
        } as ProdutosDoPedido

    const produto2 = 
        {
            id: 2,
            produtoId: 2,
            produto: { id: 2, nome: "Produto 2", preco: 15 } as unknown as Produto,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 1,
            valor: 15,
        } as ProdutosDoPedido
    
        const produtosDoPedido: any = await produtosDoPedidoGateway.createProdutosDoPedido([produto1, produto2]);

        expect(produtosDoPedido).toBeDefined();
    })


})

