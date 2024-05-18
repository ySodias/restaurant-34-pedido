import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";
import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { IPagamentoRestAPI } from "@/interfaces/repositories/IPagamentoRestAPI";

export class PagamentoGateway implements IPagamentoGateway {
    private pagamentoRestAPI: IPagamentoRestAPI;

    constructor(pagamentoRestApi: IPagamentoRestAPI) {
        this.pagamentoRestAPI = pagamentoRestApi;
    }

    async createPagamento(novoPagamentoDTO: NovoPagamentoDTO): Promise<any> {
        return await this.pagamentoRestAPI.createPagamento(novoPagamentoDTO);
    }
}