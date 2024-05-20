import { IPedidoRepository } from "@/interfaces/repositories/IPedidoRepository";
import mockPedidoRepository from "./mocks/MockPedidoRepository";
import { Pedido } from "@/entities/Pedido";
import StatusPedido from "@/entities/StatusPedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";
import PedidoRepository from "@/external/repositories/PedidoRepository";
import { prismaMock } from "./mocks/MockPrisma";


describe("PedidoRepository - getPedidoById", () => {
    let pedidoRepository: IPedidoRepository;

    

    beforeAll(async () => {
        pedidoRepository = new PedidoRepository(prismaMock);        
    });


    it("get pedido", async () => {
        const pedido = {
            id: 1,
            clienteId: 1,
            statusPedidoId: 1,
            pagamentoId: "1",
            statusPedido: {} as StatusPedido,
            createdAt: new Date() as Date,
            updatedAt: new Date() as Date,
        }
        prismaMock.pedido.findUnique.mockResolvedValue(pedido)
        const pedidoBuscado: any = await pedidoRepository.getPedidoById(1);

        expect(pedidoBuscado).toBeDefined();
    })

    it("get pedido fail", async () => {
        prismaMock.pedido.findUnique.mockRejectedValue(new Error('Error'))
        await expect(
         pedidoRepository.getPedidoById(1)
        ).rejects.toThrow()
    })

    it("getPedidos", async () => {
        const pedido = {
            id: 1,
            clienteId: 1,
            statusPedidoId: 1,
            pagamentoId: "1",
            statusPedido: {} as StatusPedido,
            createdAt: new Date() as Date,
            updatedAt: new Date() as Date,
        }
        prismaMock.pedido.findMany.mockResolvedValue([pedido])
        const pedidos: any = await pedidoRepository.getPedidos();

        expect(pedidos).toBeDefined();
    })

    it("getPedidos Fail", async () => {
        prismaMock.pedido.findMany.mockRejectedValue(new Error('Error'))
        await expect(
          pedidoRepository.getPedidos()
        ).rejects.toThrow()
    })

    it("getPedidosByStatus", async () => {
        const pedido = {
            id: 1,
            clienteId: 1,
            statusPedidoId: 1,
            pagamentoId: "1",
            statusPedido: {} as StatusPedido,
            createdAt: new Date() as Date,
            updatedAt: new Date() as Date,
        }
        prismaMock.pedido.findMany.mockResolvedValue([pedido])
        const pedidos: any = await pedidoRepository.getPedidosByStatus(1);

        expect(pedidos).toBeDefined();
    })

    it("getPedidosByStatus Fail", async () => {
        prismaMock.pedido.findMany.mockRejectedValue(new Error('Error'))
        await expect(
            pedidoRepository.getPedidosByStatus(1)
        ).rejects.toThrow(Error)
    })

    it("lista por status checkout", async () => {
        const pedido = {
            id: 1,
            clienteId: 1,
            statusPedidoId: 1,
            pagamentoId: "1",
            statusPedido: {} as StatusPedido,
            createdAt: new Date() as Date,
            updatedAt: new Date() as Date,
        }
        prismaMock.pedido.findMany.mockResolvedValue([pedido])
        const pedidos: any = await pedidoRepository.getPedidoByStatusFakeCheckout("Em");

        expect(pedidos).toBeDefined();
    })

    it("lista por status checkout Fail", async () => {
        prismaMock.pedido.findMany.mockRejectedValue(new Error('Error'))
        await expect(
            pedidoRepository.getPedidoByStatusFakeCheckout("Em")
        ).rejects.toThrow(Error)
    })

    it("atualiza pedido", async () => {
        const pedido = {
            id: 1,
            clienteId: 1,
            statusPedidoId: 1,
            pagamentoId: "1",
            statusPedido: {} as StatusPedido,
            createdAt: new Date() as Date,
            updatedAt: new Date() as Date,
        }
        prismaMock.pedido.update.mockResolvedValue(pedido)
        try {
            const pedido = await pedidoRepository.updatePedido(1, "Pronto");
            expect(pedido).toBeDefined();
        } catch (error) {
            fail("Erro ao atualizar pedido");
        }
    });

    it("lista por status checkout Fail", async () => {
        prismaMock.pedido.update.mockRejectedValue(new Error('Error'))
        await expect(
            pedidoRepository.updatePedido(1, "Pronto")
        ).rejects.toThrow()
    })

    const pedido = criarPedidoFake()
    it("create", async () => {
        const pedidoCriado = {
            id: 1,
            clienteId: 1,
            statusPedidoId: 1,
            pagamentoId: "1",
            statusPedido: {} as StatusPedido,
            createdAt: new Date() as Date,
            updatedAt: new Date() as Date,
        }
        prismaMock.pedido.create.mockResolvedValue(pedidoCriado)
        const pedidoBuscado: any = await pedidoRepository.create(pedido);

        expect(pedidoBuscado).toBeDefined();
    })

    it("lista por status checkout Fail", async () => {
        prismaMock.pedido.create.mockRejectedValue(new Error('Error'))
        await expect(
            pedidoRepository.create(pedido)
        ).rejects.toThrow()
    })

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