import { IPedidoUseCase } from "@/interfaces";
import { prisma } from "../jest.setup";
import PedidoUseCase from "@/usecases/pedido/PedidoUseCase";
import mockPedidoGateway from "./MockPedidoGateway";
import mockProdutoDoPedidoGateway from "./MockProdutoDoPedidoGateway";

const mockPedidoUseCase: IPedidoUseCase = new PedidoUseCase(mockProdutoDoPedidoGateway, mockPedidoGateway);

jest.spyOn(mockPedidoUseCase, "executeGetPedidoById")
    .mockImplementation(async (idPedido: number) => {

        return mockPedidoGateway.getPedidoById(idPedido);

    })


export default mockPedidoUseCase;