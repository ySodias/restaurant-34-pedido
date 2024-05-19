import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";
import PagamentoRestApi from "@/external/http/PagamentoRestApi";
import { IPagamentoRestAPI } from "@/interfaces/repositories/IPagamentoRestAPI";

const mockPagamentoRestAPI: IPagamentoRestAPI = new PagamentoRestApi();

jest.spyOn(mockPagamentoRestAPI, "createPagamento")
    .mockImplementation(async (novoPagamentoDTO: NovoPagamentoDTO) => {
        return {
            data: {
            "idPagamento": "6648a8dac6e6d476715599b9",
            "idPedido": 1,
            "statusPagamento": "PENDENTE",
            "tipoPagamento": "CARTAO_CREDITO",
            "dataPagamento": "2024-05-18T13:10:50.859Z",
            "valor": 50
            }
        }
    });

export default mockPagamentoRestAPI;