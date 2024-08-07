import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { IProdutosDoPedidoRepository } from "@/interfaces";
import { prismaMock } from "./mocks/MockPrisma";
import ProdutosDoPedidoRepository from "@/external/repositories/ProdutosDoPedidoRepository";

describe("Produto do pedido", () => {
    let produtosDoPedidoRepository: IProdutosDoPedidoRepository;

    beforeAll(async () => {
        produtosDoPedidoRepository = new ProdutosDoPedidoRepository(prismaMock);
    });

    it("create", async () => {
        const produto1 = {
            id: 1,
            produtoId: 1,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ProdutosDoPedido;

        const produto2 = {
            id: 2,
            produtoId: 2,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 1,
            valor: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ProdutosDoPedido;

        const retorno = {
            count: 2,
        };

        prismaMock.produtosDoPedido.createMany.mockResolvedValue(retorno);
        const produtoDoPedido: any = await produtosDoPedidoRepository.create([
            produto1,
            produto2,
        ]);

        expect(produtoDoPedido).toBeDefined();
    });

    it("create fail", async () => {
        const produto1 = {
            id: 1,
            produtoId: 1,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ProdutosDoPedido;

        const produto2 = {
            id: 2,
            produtoId: 2,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 1,
            valor: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ProdutosDoPedido;

        prismaMock.produtosDoPedido.createMany.mockRejectedValue(
            new Error("Error")
        );
        await expect(
            produtosDoPedidoRepository.create([produto1, produto2])
        ).rejects.toThrow();
    });

    it("delete", async () => {
        const produto1 = {
            id: 1,
            produtoId: 1,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ProdutosDoPedido;

        const produto2 = {
            id: 2,
            produtoId: 2,
            pedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 1,
            valor: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ProdutosDoPedido;

        const retorno = {
            count: 2,
        };

        prismaMock.produtosDoPedido.deleteMany.mockResolvedValue(retorno);
        const produtoDoPedido: any = await produtosDoPedidoRepository.delete([
            produto1,
            produto2,
        ]);

        expect(produtoDoPedido).toBeDefined();
    });

    it("get", async () => {
        const retorno = {
            id: 2,
            produtoId: 1,
            pedidoId: 1,
            pagamentoId: "1",
            clienteId: 1,
            statusPedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.produtosDoPedido.findMany.mockResolvedValue([retorno]);
        const produtoDoPedido: any = await produtosDoPedidoRepository.get(2);

        expect(produtoDoPedido).toBeDefined();
    });

    it("get none", async () => {
        prismaMock.produtosDoPedido.findMany.mockResolvedValue([]);
        const produtoDoPedido: any = await produtosDoPedidoRepository.get(2);
        expect(produtoDoPedido).toBeDefined();
    });

    it("get fail", async () => {
        const retorno = {
            id: 2,
            produtoId: 1,
            pedidoId: 1,
            pagamentoId: "1",
            clienteId: 1,
            statusPedidoId: 1,
            pedido: {} as Pedido,
            quantidade: 2,
            valor: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.produtosDoPedido.findMany.mockRejectedValue(
            new Error("Error")
        );
        await expect(produtosDoPedidoRepository.get(2)).rejects.toThrow();
    });
});
