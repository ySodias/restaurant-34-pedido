import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";

export interface IPagamentoRestAPI {
    createPagamento(novoPagamentoDTO: NovoPagamentoDTO): Promise<any>;
}