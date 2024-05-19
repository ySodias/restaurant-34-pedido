import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { PagamentoGateway } from "@/gateways/PagamentoGateway";
import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";
import mockPagamentoRestAPI from "./MockPagamentoRestAPI";

const mockPagamentoGateway: IPagamentoGateway = new PagamentoGateway(mockPagamentoRestAPI);

jest.spyOn(mockPagamentoGateway, "createPagamento")
    .mockImplementation(async (pagamentoDto: NovoPagamentoDTO) => {
        return mockPagamentoRestAPI.createPagamento(pagamentoDto);
    });

export default mockPagamentoGateway;
