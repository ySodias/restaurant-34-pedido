
import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import mockProdutosDoPedidoRepository from "./mocks/MockProdutoDoPedidoRepository";
import { IProdutosDoPedidoRepository } from "@/interfaces";
import { prismaMock } from "./mocks/MockPrisma";
import ProdutosDoPedidoRepository from "@/external/repositories/ProdutosDoPedidoRepository";
import { ProdutoGateway } from "@/gateways/ProdutoGateway";
import mockProdutoRestApi from "./mocks/MockProdutoRestAPI";
import { IProdutoGateway } from "@/interfaces/gateway/IProdutoGateway";


describe("Produto do pedido", () => {

    let produtoGateway: IProdutoGateway;

    

    beforeAll(async () => {
        produtoGateway = new ProdutoGateway(mockProdutoRestApi);        
    });


    it("getProdutoPorId", async () => {
  
        
        const produto: any = await produtoGateway.getProdutoPorId(1);

        expect(produto).toBeDefined();
    })
})

