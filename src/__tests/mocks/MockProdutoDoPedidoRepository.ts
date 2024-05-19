
import { IProdutosDoPedidoRepository } from '@/interfaces';
import { prisma } from '../jest.setup';
import ProdutosDoPedidoRepository from '@/external/repositories/ProdutosDoPedidoRepository';
import { ProdutosDoPedido } from '@/entities/ProdutosDoPedido';

const mockProdutosDoPedidoRepository: IProdutosDoPedidoRepository = new ProdutosDoPedidoRepository(prisma);

jest.spyOn(mockProdutosDoPedidoRepository, "create")
    .mockImplementation(async (produtosDoPedido: ProdutosDoPedido[]) => {
        // Mapeie o array de produtos do pedido para o formato adequado para o Prisma
        const produtosDoPedidoData = produtosDoPedido.map(produtoDoPedido => ({
            produtoId: produtoDoPedido.produtoId,
            pedidoId: produtoDoPedido.pedidoId,
            quantidade: produtoDoPedido.quantidade,
            valor: produtoDoPedido.valor,
        }));

        // Crie os produtos do pedido no banco de dados
        const createdProdutosDoPedido = await prisma.produtosDoPedido.createMany({
            data: produtosDoPedidoData,
        });

        // Retorne os produtos do pedido criados
        return createdProdutosDoPedido;
    });


jest.spyOn(mockProdutosDoPedidoRepository, "get")
    .mockImplementation(async (idPedido: number) => {
        return await prisma.produtosDoPedido.findMany({
            where: {
                pedidoId: idPedido,
            },
        }); 
    });


export default mockProdutosDoPedidoRepository;