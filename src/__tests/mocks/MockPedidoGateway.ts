import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";
import { Pedido } from "@/entities/Pedido";

const mockPedidoGateway: IPedidoGateway = new PedidoGateway(mockPedidoRepository);

jest.spyOn(mockPedidoGateway, "getPedidoById")
    .mockImplementation(async (idPedido: number) => {
        return mockPedidoRepository.getPedidoById(idPedido);
    });

jest.spyOn(mockPedidoGateway, "createPedido")
    .mockImplementation(async (pedido: Pedido) => {
        return mockPedidoRepository.create(pedido);
    });

jest.spyOn(mockPedidoGateway, "getPedidos")
    .mockImplementation(async () => {
        return mockPedidoRepository.getPedidos();
    });

jest.spyOn(mockPedidoGateway, "getPedidosByStatus")
    .mockImplementation(async (status: number) => {
        return mockPedidoRepository.getPedidosByStatus(status);
    });

jest.spyOn(mockPedidoGateway, "getPedidoByStatusFakeCheckout")
    .mockImplementation(async (status: string) => {
        return mockPedidoRepository.getPedidoByStatusFakeCheckout(status);
    });


jest.spyOn(mockPedidoGateway, "updatePedido")
    .mockImplementation(async (idPedido: number, statusPedido: string) => {
        return mockPedidoRepository.updatePedido(idPedido, statusPedido);
    });


export default mockPedidoGateway;