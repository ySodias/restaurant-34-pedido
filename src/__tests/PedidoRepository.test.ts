import { IPedidoRepository } from "@/interfaces/repositories/IPedidoRepository";
import mockPedidoRepository from "./mocks/MockPedidoRepository";
import { Pedido } from "@/entities/Pedido";
import StatusPedido from "@/entities/StatusPedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";

describe("PedidoRepository - getPedidoById", () => {
    let pedidoRepository: IPedidoRepository = mockPedidoRepository;

    it("get pedido", async () => {
        const pedidoBuscado: any = await pedidoRepository.getPedidoById(1);

        expect(pedidoBuscado).toBeDefined();
    })

    it("getPedidos", async () => {
        const pedidos: any = await pedidoRepository.getPedidos();

        expect(pedidos).toBeDefined();
    })

    it("getPedidosByStatus", async () => {
        const pedidos: any = await pedidoRepository.getPedidosByStatus(1);

        expect(pedidos).toBeDefined();
    })

    it("lista por status checkout", async () => {
        const pedidos: any = await pedidoRepository.getPedidoByStatusFakeCheckout("Em");

        expect(pedidos).toBeDefined();
    })


    it("atualiza pedido", async () => {
        try {
            const pedido = await pedidoRepository.updatePedido(1, "Pronto");
            expect(pedido).toBeDefined();
        } catch (error) {
            fail("Erro ao atualizar pedido");
        }
    });


    const pedido = criarPedidoFake()
    it("create", async () => {
        const pedidoBuscado: any = await pedidoRepository.create(pedido);

        expect(pedidoBuscado).toBeDefined();
    })

})



function criarPedidoFake(): Pedido {
    // Dados fictícios do pedido
    const pedido: Pedido = {
        id: 1,
        clienteId: 1,
        pagamentoId: 1,
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