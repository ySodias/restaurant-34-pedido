import { StatusPedidoEnum } from "../enums/EnumStatusPedido"
import { ProdutosDoPedido } from "./ProdutosDoPedido";
import { BaseEntity } from "./BaseEntity";

interface Pedido extends BaseEntity {
  id: number;
  clienteId: number;
  pagamentoId?: string;
  statusPedidoId: number;
  statusPedido: StatusPedidoEnum;
  ProdutosDoPedido: ProdutosDoPedido[];
}

export { Pedido };