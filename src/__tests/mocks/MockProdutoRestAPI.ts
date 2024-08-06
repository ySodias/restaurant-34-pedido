import ProdutoRestApi from "@/external/http/ProdutoRestApi";
import { IProdutoRestAPI } from "@/interfaces/repositories/IProdutoRestAPI";

const mockProdutoRestApi: IProdutoRestAPI = new ProdutoRestApi();

jest.spyOn(mockProdutoRestApi, "getProdutoPorId")
    .mockImplementation(async (produtoId: number) => {
        return {
            data: {
                preco: 1
            }
        }
    });

export default mockProdutoRestApi;