import { IPedidoUseCase } from "@/interfaces";
import PedidoUseCase from "@/usecases/pedido/PedidoUseCase";
import mockPedidoGateway from "./MockPedidoGateway";
import mockProdutoDoPedidoGateway from "./MockProdutoDoPedidoGateway";
import mockPagamentoGateway from "./MockPagamentoGateway";
import mockProdutoGateway from "./MockProdutoGateway";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";

const mockPedidoUseCase: IPedidoUseCase = new PedidoUseCase(mockProdutoDoPedidoGateway, mockPedidoGateway, mockPagamentoGateway, mockProdutoGateway);

jest.spyOn(mockPedidoUseCase, "executeGetPedidoById")
    .mockImplementation(async (idPedido: number) => {

        return mockPedidoGateway.getPedidoById(idPedido);

    })


export default mockPedidoUseCase;