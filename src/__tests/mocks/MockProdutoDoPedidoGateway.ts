import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import { IProdutoDoPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";
import mockProdutosDoPedidoRepository from "./MockProdutoDoPedidoRepository";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";

const mockProdutoDoPedidoGateway: IProdutoDoPedidoGateway = new ProdutoDoPedidoGateway(mockProdutosDoPedidoRepository);

jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
    .mockImplementation(async (idPedido: number) => {
        return mockProdutosDoPedidoRepository.get(idPedido);
    });

jest.spyOn(mockProdutoDoPedidoGateway, "deleteProdutosDoPedido")
    .mockImplementation(async (produtosDoPedido: ProdutosDoPedido[]) => {
        return mockProdutosDoPedidoRepository.delete(produtosDoPedido);
    });

jest.spyOn(mockProdutoDoPedidoGateway, "createProdutosDoPedido")
    .mockImplementation(async (produtosDoPedido: ProdutosDoPedido[]) => {
        return mockProdutosDoPedidoRepository.create(produtosDoPedido);
    });

export default mockProdutoDoPedidoGateway;