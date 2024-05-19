
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { IProdutoDoPedidoGateway, IProdutosDoPedidoRepository } from "@/interfaces";

export class ProdutoDoPedidoGateway implements IProdutoDoPedidoGateway {
    private produtoDoPedidoRepository: IProdutosDoPedidoRepository;

    constructor(produtoDoPedidoRepository: IProdutosDoPedidoRepository) {
        this.produtoDoPedidoRepository = produtoDoPedidoRepository;
    }
    executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number) {
        try {
            const produto: any = this.getProdutosDoPedido(idPedido)
            this.produtoDoPedidoRepository.delete(produto);
            return 'Produto removido do pedido com sucesso.';
        } catch (error) {
            console.error("Erro ao remover produto(s) no pedido:", error);
            throw new Error("Erro ao remover produto(s) no pedido.");
        }
    }
    removeProdutoDoPedido(idPedido: number, idProdutos: number): void {
        const produto: any = this.getProdutosDoPedido(idPedido)

        this.produtoDoPedidoRepository.delete(produto);
    }

    async createProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        return this.produtoDoPedidoRepository.create(produtosDoPedido);
    }

    async deleteProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        return this.produtoDoPedidoRepository.delete(produtosDoPedido);
    }

    async getProdutosDoPedido(idPedido: number): Promise<ProdutosDoPedido[]> {
        return this.produtoDoPedidoRepository.get(idPedido);
    }
}
