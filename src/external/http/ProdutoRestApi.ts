import { IProdutoRestAPI } from '@/interfaces/repositories/IProdutoRestAPI';
import axios from 'axios';

class ProdutoRestApi implements IProdutoRestAPI {
    private readonly baseUrl: string = process.env.MS_PRODUTO_URL as string;

    async getProdutoPorId(idProduto: number): Promise<any> {
        return axios.get(`${this.baseUrl}produto/${idProduto}`);
    }
}

export default ProdutoRestApi;