import { IProdutoGateway } from "@/interfaces/gateway/IProdutoGateway";
import { IProdutoRestAPI } from "@/interfaces/repositories/IProdutoRestAPI";

export class ProdutoGateway implements IProdutoGateway {
    private produtoRestAPI: IProdutoRestAPI;

    constructor(produtoRestApi: IProdutoRestAPI) {
        this.produtoRestAPI = produtoRestApi;
    }

    async getProdutoPorId(idProduto: number): Promise<any> {
        return await this.produtoRestAPI.getProdutoPorId(idProduto);
    }
}
