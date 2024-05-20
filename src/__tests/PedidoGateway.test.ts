import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import StatusPedido from "@/entities/StatusPedido";
import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";
import exp from "constants";
import mockPedidoRepository from "./mocks/MockPedidoRepository";


describe("PedidoGateway - deve retornar pedido por id", () => {
    let pedidoGateway: IPedidoGateway;

    beforeAll(async () => {
        pedidoGateway = new PedidoGateway(mockPedidoRepository);        
    });


    it("get pedido", async () => {
        const pedidoBuscado: any = await pedidoGateway.getPedidoById(1);

        expect(pedidoBuscado).toBeDefined();
    });


})

describe("PedidoGateway - deve retornar lista de pedidos", () => {

    let pedidoGateway: IPedidoGateway;

    beforeAll(async () => {
        pedidoGateway = new PedidoGateway(mockPedidoRepository);
    })

    it("get lista", async () => {
        const pedidos: any = await pedidoGateway.getPedidos();

        expect(pedidos).toBeDefined();

    })

})

describe("PedidoGateway - deve retornar pedido por status", () => {
    let pedidoGateway: IPedidoGateway

    beforeAll(async () => {
        pedidoGateway = new PedidoGateway(mockPedidoRepository);
    })

    it("get pedido por status", async () => {
        const pedidos: any = await pedidoGateway.getPedidosByStatus(3);

        expect(pedidos).toBeDefined();

    })

    
})

describe("PedidoGateway - deve retornar pedido por fake checkout", () => {
    let pedidoGateway: IPedidoGateway

    beforeAll(async () => {
        pedidoGateway = new PedidoGateway(mockPedidoRepository);
    })

    it("get pedido por fake checkout", async () => {
        const pedidos: any = await pedidoGateway.getPedidoByStatusFakeCheckout("Em");

        expect(pedidos).toBeDefined();

    })

    
})

describe("PedidoGateway - deve criar pedido", () => {
    let pedidoGateway: IPedidoGateway

    const pedidoFake = criarPedidoFake();

    beforeAll(async () => {
        pedidoGateway = new PedidoGateway(mockPedidoRepository);
    })

   

    it("create pedido", async () => {
        const pedidos: any = await pedidoGateway.createPedido(pedidoFake);

        expect(mockPedidoRepository.create).toHaveBeenCalledWith(pedidoFake);

        expect(pedidos).toBeDefined();
        expect(pedidos.id).toBeDefined(); // Verifica se o ID foi definido
        expect(pedidos.clienteId).toEqual(pedidoFake.clienteId); 

    });

    it("update pedido", async () => {
        try {
            const pedidoAtualizado: any = await pedidoGateway.updatePedido(1, "Pronto");
            expect(pedidoAtualizado).toBeDefined();
        } catch (error) {
            throw new Error(`Erro ao Atualizar Pedido de Id 1`);
        }
    });
    




    
})


function criarPedidoFake(): Pedido {
    // Dados fictícios do pedido
    const pedido: Pedido = {
        id: 1,
        clienteId: 1,
        pagamentoId: "1",
        statusPedidoId: 1,
        statusPedido: { id: 1, enumerador: "Em Preparação" } as StatusPedido,
        ProdutosDoPedido: [
            {
                id: 1,
                produtoId: 1,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 2,
                valor: 20,
                createdAt: new Date,
                updatedAt: new Date
            } as ProdutosDoPedido,
            {
                id: 2,
                produtoId: 2,
                pedidoId: 1,
                pedido: {} as Pedido,
                quantidade: 1,
                valor: 15,
                createdAt: new Date,
                updatedAt: new Date
            } as ProdutosDoPedido,
        ],
        createdAt: new Date,
        updatedAt: new Date
    };

    return pedido;
}