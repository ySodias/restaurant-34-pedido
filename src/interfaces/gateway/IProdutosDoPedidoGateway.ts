import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";

export interface IProdutoDoPedidoGateway {
    createProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;

    deleteProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;
    removeProdutoDoPedido(idPedido: number, idProdutos: number): any;
    getProdutosDoPedido(idPedido: number): Promise<any>;
    executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number): any;
}
