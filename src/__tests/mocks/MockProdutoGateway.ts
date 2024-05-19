import { IProdutoGateway } from "@/interfaces/gateway/IProdutoGateway";
import { ProdutoGateway } from "@/gateways/ProdutoGateway";
import mockProdutoRestApi from "./MockProdutoRestAPI";

const mockProdutoGateway: IProdutoGateway = new ProdutoGateway(mockProdutoRestApi);

jest.spyOn(mockProdutoGateway, "getProdutoPorId")
    .mockImplementation(async (idProduto: number) => {
        return mockProdutoRestApi.getProdutoPorId(idProduto);
    });

export default mockProdutoGateway;