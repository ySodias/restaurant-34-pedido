import { IPedidoRepository } from '@/interfaces/repositories/IPedidoRepository';
import { prisma } from '../jest.setup';
import PedidoRepository from '@/external/repositories/PedidoRepository';
import { Pedido } from '@/entities/Pedido';
import { ProdutosDoPedido } from '@/entities/ProdutosDoPedido';
import { StatusPedidoEnum } from '@/enums/EnumStatusPedido';
const mockPedidoRepository: IPedidoRepository = new PedidoRepository(prisma);

const pedidoCriado: any = {
    id: 1,
    statusPedido: StatusPedidoEnum.RECEBIDO,
    statusPedidoId: 1,
    clienteId: 1,
    ProdutosDoPedido: {} as ProdutosDoPedido
}

jest.spyOn(mockPedidoRepository, "create")
    .mockImplementation(async (pedido: Pedido): Promise<Pedido> => {
        return await prisma.pedido.create({
            data: {
                statusPedidoId: pedido?.statusPedidoId,
                clienteId: pedido.clienteId,
            },
        }) as Pedido;
    }).mockResolvedValue(pedidoCriado);


jest.spyOn(mockPedidoRepository, "getPedidoById")
    .mockImplementation(async (id: number): Promise<Pedido> => {
        return await prisma.pedido.findUnique({
            where: {
                id: id,
            },
        }) as Pedido;
}).mockResolvedValue(pedidoCriado);

jest.spyOn(mockPedidoRepository, "getPedidos")
    .mockImplementation(async (): Promise<Pedido[]> => {
        return await prisma.pedido.findMany() as Pedido[];
}).mockResolvedValue([pedidoCriado]);

jest.spyOn(mockPedidoRepository, "getPedidosByStatus")
    .mockImplementation(async (idStatusPedido: number): Promise<Pedido[]> => {
        return await prisma.pedido.findMany({
            where: {
                statusPedido: {
                    id: idStatusPedido,
                },
            },
            include: {
                statusPedido: {
                    select: {
                        enumerador: true,
                    },
                },
            },
        }) as unknown as Pedido[];
}).mockResolvedValue([pedidoCriado]);

jest.spyOn(mockPedidoRepository, "getPedidoByStatusFakeCheckout")
    .mockImplementation(async (status: string): Promise<Pedido[]> => {
        return await prisma.pedido.findMany({
            where: {
                statusPedido: {
                    enumerador: {
                        startsWith: status,
                    },
                },
            },
            include: {
                statusPedido: {
                    select: {
                        enumerador: true,
                    },
                },
            },
        }) as unknown as Pedido[];
}).mockResolvedValue([pedidoCriado]);

jest.spyOn(mockPedidoRepository, "updatePedido")
    .mockImplementation(async (id: number, status: string): Promise<Pedido> => {
        return await prisma.pedido.update({
            where: {
                id: id,
            },
            data: {
                statusPedido: {
                    connect: {
                        enumerador: status,
                    },
                },
            },
        }) as Pedido;
    }).mockResolvedValue(pedidoCriado);


export default mockPedidoRepository;