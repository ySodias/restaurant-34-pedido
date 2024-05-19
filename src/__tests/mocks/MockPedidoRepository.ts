import { IPedidoRepository } from '@/interfaces/repositories/IPedidoRepository';
import { prisma } from '../jest.setup';
import PedidoRepository from '@/external/repositories/PedidoRepository';
import { Pedido } from '@/entities/Pedido';

const mockPedidoRepository: IPedidoRepository = new PedidoRepository(prisma);

jest.spyOn(mockPedidoRepository, "create")
    .mockImplementation(async (pedido: Pedido): Promise<Pedido> => {
        return await prisma.pedido.create({
            data: {
                statusPedidoId: pedido?.statusPedidoId,
                clienteId: pedido.clienteId,
            },
        }) as Pedido;
    });





export default mockPedidoRepository;