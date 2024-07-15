import { IQueueAdapter } from "@/interfaces/repositories/IQueueAdapter";
import { NovoPagamentoDTO } from "../../dtos/NovoPagamentoDTO";
import { ProdutosDoPedidoDTO } from "../../dtos/ProdutosDoPedidoDTO";
import { Pedido } from "../../entities/Pedido";
import { ProdutosDoPedido } from "../../entities/ProdutosDoPedido";
import { TipoPagamento } from "../../enums/TipoPagamento";
import { IPedidoGateway, IPedidoUseCase, IProdutoDoPedidoGateway } from "../../interfaces";
import { IPagamentoGateway } from "../../interfaces/gateway/IPagamentoGateway";
import { IProdutoGateway } from "../../interfaces/gateway/IProdutoGateway";
import { StatusPedidoEnum, getStatusPedidoPorDescricao } from "@/enums/EnumStatusPedido";

class PedidoUseCase implements IPedidoUseCase {
    private produtosDoPedidoGateway: IProdutoDoPedidoGateway;
    private pedidoGateway: IPedidoGateway;
    private pagamentoGateway: IPagamentoGateway;
    private produtoGateway: IProdutoGateway;
    private queue: IQueueAdapter;
    private readonly pedidoQueue: string = process.env.PEDIDO_QUEUE as string;

    constructor(
        produtosDoPedidoGateway: IProdutoDoPedidoGateway,
        pedidoGateway: IPedidoGateway,
        pagamentoGateway: IPagamentoGateway,
        produtoGateway: IProdutoGateway,
        queue: IQueueAdapter
    ) {
        this.produtosDoPedidoGateway = produtosDoPedidoGateway;
        this.pedidoGateway = pedidoGateway;
        this.pagamentoGateway = pagamentoGateway;
        this.produtoGateway = produtoGateway;
        this.queue = queue
    }
    async executeDelete(idPedido: number) {
        try {
            // Obtém os itens do pedido
            const itensPedido = await this.executeGetProdutoDoPedido(idPedido);

            // Remove os itens do pedido
            await this.produtosDoPedidoGateway.deleteProdutosDoPedido(itensPedido);

            // Retorna uma mensagem de sucesso
            return 'Itens do pedido removidos com sucesso.';
        } catch (error) {
            console.error("Erro ao excluir itens do pedido:", error);
            throw new Error("Erro ao excluir itens do pedido.");
        }
    }


    async executeCreation(pedidoData: Pedido): Promise<Pedido> {
        pedidoData.statusPedidoId = StatusPedidoEnum.RECEBIDO;
        const pedidoCriado: Pedido = await this.pedidoGateway.createPedido(pedidoData);
        return pedidoCriado;
    }

    async executeGetPedidoById(idPedido: number): Promise<Pedido> {
        return this.pedidoGateway.getPedidoById(idPedido);
    }

    async executeGetPedidos(): Promise<Pedido[]> {
        const pedidos = await this.pedidoGateway.getPedidos();
        const pedidosOrdenados: Pedido[] = this.orderPedidos(pedidos);
        return pedidosOrdenados;
    }

    async executeGetPedidosByStatus(idStatusPedido: number): Promise<Pedido[]> {
        return this.pedidoGateway.getPedidosByStatus(idStatusPedido);
    }

    async executeGetPedidoFakeCheckout(status: string): Promise<Pedido[]> {
        return this.pedidoGateway.getPedidoByStatusFakeCheckout(status);
    }

    async executeAddProdutosAoPedido(produtosDoPedido: ProdutosDoPedidoDTO[]): Promise<any> {

        const produtosComValores: ProdutosDoPedido[] = [];

        await Promise.all(
            produtosDoPedido.map(async (produto: any) => {
                try {
                    // Obter o valor do produto do gateway
                    const response = await this.produtoGateway.getProdutoPorId(produto.produtoId);
                    produto.valor = response.data.preco;
                    produtosComValores.push(produto);
                } catch (error) {
                    console.error("Erro ao buscar produto:", error);
                    throw new Error("Erro ao buscar produto");
                }
            }));

        return this.produtosDoPedidoGateway.createProdutosDoPedido(produtosComValores);
    }

    async executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number) {
        return this.produtosDoPedidoGateway.removeProdutoDoPedido(idPedido, idProdutos)
    }


    async executeUpdatePedidoFinalizado(idPedido: number) {
        try {
            const valor = await this.calculaValorDoPedido(idPedido);

            if (valor == 0) {
                let message = "Error ao criar novo pagamento, valor total de produtos igual a zero"
                console.error(message);
                throw new Error(message);
            }

            const novoPagamentoDTO: NovoPagamentoDTO = {
                idPedido: idPedido,
                valor: valor,
                tipoPagamento: TipoPagamento.PIX
            }
            let pagamentoId;

            await this.pagamentoGateway.createPagamento(novoPagamentoDTO).then(async res => {
                pagamentoId = res.data.idPagamento;
            }).catch(error => {
                console.error("Error ao criar novo pagamento:", error.response?.data);
                throw new Error(error);
            });

            const pedidoParaAtualizar: any = {
                id: idPedido,
                pagamentoId: pagamentoId,
                statusPedido: StatusPedidoEnum.FINALIZADO
            }
            const pedido = await this.pedidoGateway.updatePedidoCompleto(pedidoParaAtualizar);

            return pedido;
        } catch (error) {
            console.error("Erro ao atualizar pedido para finalizado:", error);
            throw new Error(`Erro ao atualizar pedido para finalizado: ${error}`);
        }
    }

    async executeUpdatePedidoPreparacao(idPedido: number) {

        const response = await this.pedidoGateway.updatePedido(
            idPedido,
            "Em preparação"
        );

        return response;

    }

    async executeUpdatePedidoPronto(idPedido: number) {
        const response = await this.pedidoGateway.updatePedido(
            idPedido,
            "Pronto"
        );

        return response;

    }

    async executeGetProdutoDoPedido(idPedido: number) {
        try {
            const produtosDoPedido = await this.produtosDoPedidoGateway.getProdutosDoPedido(idPedido);
            return produtosDoPedido;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar Produtos do Pedido ${idPedido}`);
        }
    }

    async executeUpdateStatusPedido(idPedido: number, statusPedido: string) {
        if (!idPedido || !statusPedido) {
            throw new Error("Erro ao atualizar status do pedido. Campos 'idPedido' e 'statusPedido' são obrigatórios.");
        }

        const pedido: Pedido = await this.pedidoGateway.getPedidoById(idPedido);

        if (!pedido) {
            throw new Error("Pedido não encontrado.");
        }

        try {
            const statusEnum = getStatusPedidoPorDescricao(statusPedido);

            if ([StatusPedidoEnum.EM_PREPARACAO, StatusPedidoEnum.PRONTO, StatusPedidoEnum.FINALIZADO].includes(statusEnum) && !pedido.pagamentoId) {
                throw new Error(`O pagamento é necessário para mudar para o status '${statusPedido}'.`);
            }

            pedido.statusPedido = statusEnum;
            const pedidoAtualizado = await this.pedidoGateway.updatePedidoCompleto(pedido);

            if (statusEnum === StatusPedidoEnum.AGUARDANDO_PAGAMENTO) {
                await this.queue.publish(this.pedidoQueue, pedidoAtualizado);
            }

            return pedidoAtualizado;

        } catch (error) {
            console.error("Erro ao atualizar o pedido:", error);
            throw error;
        }
    }

    private orderPedidos(pedidos: Pedido[]): Pedido[] {
        const pedidosEmPreparacao = pedidos.filter((pedido) => pedido.statusPedidoId == StatusPedidoEnum.EM_PREPARACAO);
        const pedidosPronto = pedidos.filter((pedido) => pedido.statusPedidoId == StatusPedidoEnum.PRONTO);
        const pedidosRecebido = pedidos.filter((pedido) => pedido.statusPedidoId == StatusPedidoEnum.RECEBIDO);

        return [...pedidosPronto, ...pedidosEmPreparacao, ...pedidosRecebido];
    }

    async calculaValorDoPedido(pedidoId: number): Promise<number> {
        let total: number = 0;
        const produtosDoPedido: ProdutosDoPedido[] = await this.produtosDoPedidoGateway.getProdutosDoPedido(pedidoId);


        if (produtosDoPedido.length === 0) {
            return total;
        } else if (produtosDoPedido.length === 1) {
            return produtosDoPedido[0].quantidade * produtosDoPedido[0].valor;
        } else {
            produtosDoPedido.forEach((produto: any) => {
                total += produto.quantidade * produto.valor;
            });
            return total;
        }
    }

}

export default PedidoUseCase;
