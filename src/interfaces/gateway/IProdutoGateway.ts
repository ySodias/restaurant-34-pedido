export interface IProdutoGateway {
    getProdutoPorId(idProduto: number): Promise<any>;
}