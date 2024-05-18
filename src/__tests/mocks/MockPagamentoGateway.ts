import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { PagamentoGateway } from "@/gateways/PagamentoGateway";
import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";


const mockPagamentoGateway: IPagamentoGateway = new PagamentoGateway();

jest.spyOn(mockPagamentoGateway, "createPagamento")
    .mockImplementation(async (pagamentoDto: NovoPagamentoDTO) => {
        return mockPagamentoGateway.createPagamento(pagamentoDto);
    });



export default mockPagamentoGateway;