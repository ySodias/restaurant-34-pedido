export interface IProdutoRestAPI {
    getProdutoPorId(idProduto: number): Promise<any>;
}