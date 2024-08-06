import { PedidoGateway } from "@/gateways/pedido";
import { IPedidoGateway } from "@/interfaces";
import mockPedidoRepository from "./MockPedidoRepository";
import { Pedido } from "@/entities/Pedido";
import { StatusPedidoEnum } from "@/enums/EnumStatusPedido";

const mockPedidoGateway: IPedidoGateway = new PedidoGateway(mockPedidoRepository);

const pedidoParaAtualizar: any = {
    id: 1,
    pagamentoId: "6648a8dac6e6d476715599b9",
    statusPedido: StatusPedidoEnum.FINALIZADO
}

const pedidoCriado: any = {
    id: 1,
    statusPedido: StatusPedidoEnum.RECEBIDO
}

jest.spyOn(mockPedidoGateway, "getPedidoById")
    .mockImplementation(async (idPedido: number) => {
        return mockPedidoRepository.getPedidoById(idPedido);
    }).mockResolvedValue(pedidoParaAtualizar);

jest.spyOn(mockPedidoGateway, "createPedido")
    .mockImplementation(async (pedido: Pedido) => {
        return mockPedidoRepository.create(pedido);
    }).mockResolvedValue(pedidoCriado);

jest.spyOn(mockPedidoGateway, "getPedidos")
    .mockImplementation(async () => {
        return mockPedidoRepository.getPedidos();
    }).mockResolvedValue([pedidoCriado, pedidoParaAtualizar]);

jest.spyOn(mockPedidoGateway, "getPedidosByStatus")
    .mockImplementation(async (status: number) => {
        return mockPedidoRepository.getPedidosByStatus(status);
    }).mockResolvedValue([pedidoCriado, pedidoParaAtualizar]);

jest.spyOn(mockPedidoGateway, "getPedidoByStatusFakeCheckout")
    .mockImplementation(async (status: string) => {
        return mockPedidoRepository.getPedidoByStatusFakeCheckout(status);
    }).mockResolvedValue([pedidoCriado, pedidoParaAtualizar]);


jest.spyOn(mockPedidoGateway, "updatePedido")
    .mockImplementation(async (idPedido: number, statusPedido: string) => {
        return mockPedidoRepository.updatePedido(idPedido, statusPedido);
    });


jest.spyOn(mockPedidoGateway, "updatePedidoCompleto")
    .mockImplementation(async (pedido: Pedido) => {
        return mockPedidoRepository.updatePedidoCompleto(pedido);
}).mockResolvedValue(pedidoParaAtualizar);




export default mockPedidoGateway;