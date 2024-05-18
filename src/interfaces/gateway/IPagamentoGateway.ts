import { NovoPagamentoDTO } from "@/dtos/NovoPagamentoDTO";

export interface IPagamentoGateway {
    createPagamento(novoPagamentoDTO: NovoPagamentoDTO): Promise<any>;
}