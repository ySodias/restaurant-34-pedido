import { IPedidoUseCase } from "@/interfaces";
import PedidoUseCase from "@/usecases/pedido/PedidoUseCase";
import mockPedidoGateway from "./MockPedidoGateway";
import mockProdutoDoPedidoGateway from "./MockProdutoDoPedidoGateway";
import mockPagamentoGateway from "./MockPagamentoGateway";
import mockProdutoGateway from "./MockProdutoGateway";
import mockQueueService from "./MockQueueService";

const mockPedidoUseCase: IPedidoUseCase = new PedidoUseCase(mockProdutoDoPedidoGateway, mockPedidoGateway, mockPagamentoGateway, mockProdutoGateway, mockQueueService);

jest.spyOn(mockPedidoUseCase, "executeGetPedidoById")
    .mockImplementation(async (idPedido: number) => {
        return mockPedidoGateway.getPedidoById(idPedido);
    })

export default mockPedidoUseCase;