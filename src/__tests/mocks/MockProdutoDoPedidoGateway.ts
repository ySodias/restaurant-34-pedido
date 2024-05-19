import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import { IProdutoDoPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";
import mockProdutosDoPedidoRepository from "./MockProdutoDoPedidoRepository";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { Pedido } from "@/entities/Pedido";

const mockProdutoDoPedidoGateway: IProdutoDoPedidoGateway = new ProdutoDoPedidoGateway(mockProdutosDoPedidoRepository);

const produtoDoPedido = {
    id: 1,
    produtoId: 1,
    pedidoId: 1,
    pedido: {} as Pedido,
    quantidade: 1,
    valor: 5 
}

jest.spyOn(mockProdutoDoPedidoGateway, "getProdutosDoPedido")
    .mockImplementation(async (idPedido: number) => {
        return mockProdutosDoPedidoRepository.get(idPedido);
    });

jest.spyOn(mockProdutoDoPedidoGateway, "deleteProdutosDoPedido")
    .mockImplementation(async (produtosDoPedido: ProdutosDoPedido[]) => {
        return mockProdutosDoPedidoRepository.delete(produtosDoPedido);
    }).mockResolvedValue({});

jest.spyOn(mockProdutoDoPedidoGateway, "deleteProdutosDoPedido")
    .mockImplementation(async (produtosDoPedido: ProdutosDoPedido[]) => {
        return mockProdutosDoPedidoRepository.delete(produtosDoPedido);
}).mockResolvedValue({});

jest.spyOn(mockProdutoDoPedidoGateway, "createProdutosDoPedido")
    .mockImplementation(async (produtosDoPedido: ProdutosDoPedido[]) => {
        return mockProdutosDoPedidoRepository.create(produtosDoPedido);
    }).mockResolvedValue(produtoDoPedido);

jest.spyOn(mockProdutoDoPedidoGateway, "removeProdutoDoPedido")
    .mockImplementation(async (idPedido: number, idProduto: number) => {
        let produto = await mockProdutosDoPedidoRepository.get(idPedido)
        return mockProdutosDoPedidoRepository.delete(produto);
}).mockResolvedValue(undefined);




export default mockProdutoDoPedidoGateway;