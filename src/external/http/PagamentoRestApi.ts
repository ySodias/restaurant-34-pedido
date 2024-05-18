import { NovoPagamentoDTO } from '@/dtos/NovoPagamentoDTO';
import { IPagamentoRestAPI } from '@/interfaces/repositories/IPagamentoRestAPI';
import axios from 'axios';

class PagamentoRestApi implements IPagamentoRestAPI {
    private readonly baseUrl: string = process.env.MS_PAGAMENTO_URL as string;

    async createPagamento(novoPagamentoDTO: NovoPagamentoDTO): Promise<any> {
        return axios.post(`${this.baseUrl}pagamentos`, novoPagamentoDTO);
    }

}

export default PagamentoRestApi;