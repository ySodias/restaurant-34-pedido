"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Tipos de Acesso
        const adminTipoAcesso = yield prisma.tipoAcesso.upsert({
            where: { enumerador: 'Admin' },
            update: {},
            create: {
                enumerador: 'Admin',
            },
        });
        const clienteTipoAcesso = yield prisma.tipoAcesso.upsert({
            where: { enumerador: 'Cliente' },
            update: {},
            create: {
                enumerador: 'Cliente',
            },
        });
        const funcionarioTipoAcesso = yield prisma.tipoAcesso.upsert({
            where: { enumerador: 'Funcionário' },
            update: {},
            create: {
                enumerador: 'Funcionário',
            },
        });
        // Clientes
        const cliente1 = yield prisma.usuario.upsert({
            where: { id: 1 },
            update: {},
            create: {
                tipoAcesso: clienteTipoAcesso.enumerador,
                login: 'joao123',
                senha: 'joaopass',
                cliente: {
                    create: {
                        nome: 'João Silva',
                        email: 'joao123@example.com',
                        cpf: Math.floor(Math.random() * 10000000000).toString(),
                    },
                },
            },
        });
        const cliente2 = yield prisma.usuario.upsert({
            where: { id: 2 },
            update: {},
            create: {
                tipoAcesso: clienteTipoAcesso.enumerador,
                login: 'maria456',
                senha: 'mariapass',
                cliente: {
                    create: {
                        nome: 'Maria Santos',
                        email: 'maria456@example.com',
                        cpf: Math.floor(Math.random() * 10000000000).toString(),
                    },
                },
            },
        });
        const cliente3 = yield prisma.usuario.upsert({
            where: { id: 3 },
            update: {},
            create: {
                tipoAcesso: clienteTipoAcesso.enumerador,
                login: 'pedro789',
                senha: 'pedropass',
                cliente: {
                    create: {
                        nome: 'Pedro Oliveira',
                        email: 'pedro789@example.com',
                        cpf: Math.floor(Math.random() * 10000000000).toString(),
                    },
                },
            },
        });
        const cliente4 = yield prisma.usuario.upsert({
            where: { id: 4 },
            update: {},
            create: {
                tipoAcesso: clienteTipoAcesso.enumerador,
                login: 'ana101',
                senha: 'anapass',
                cliente: {
                    create: {
                        nome: 'Ana Rocha',
                        email: 'ana101@example.com',
                        cpf: Math.floor(Math.random() * 10000000000).toString(),
                    },
                },
            },
        });
        const cliente5 = yield prisma.usuario.upsert({
            where: { id: 5 },
            update: {},
            create: {
                tipoAcesso: clienteTipoAcesso.enumerador,
                login: 'ricardo2022',
                senha: 'ricardopass',
                cliente: {
                    create: {
                        nome: 'Ricardo Sousa',
                        email: 'ricardo2022@example.com',
                        cpf: Math.floor(Math.random() * 10000000000).toString(),
                    },
                },
            },
        });
        // Admim
        const admin = yield prisma.usuario.upsert({
            where: { login: 'admin', tipoAcesso: 'Admin' },
            update: {},
            create: {
                tipoAcesso: adminTipoAcesso.enumerador,
                login: 'admin',
                senha: 'adminpass',
            },
        });
        // Funcionários
        const funcionarios = [
            {
                nome: 'Carlos Pereira',
                login: 'carlos1',
                senha: 'carlospass',
                cargo: 'Atendente',
                admin: 'Não',
            },
            {
                nome: 'Sandra Lima',
                login: 'sandra2',
                senha: 'sandrapass',
                cargo: 'Gerente',
                admin: 'Não',
            },
            {
                nome: 'Lucas Costa',
                login: 'lucas3',
                senha: 'lucaspass',
                cargo: 'Técnico',
                admin: 'Não',
            },
            {
                nome: 'Fernanda Oliveira',
                login: 'fernanda4',
                senha: 'fernandapass',
                cargo: 'Atendente',
                admin: 'Não',
            },
        ];
        for (const funcionario of funcionarios) {
            yield prisma.usuario.upsert({
                where: { login: funcionario.login, tipoAcesso: 'Funcionário' },
                update: {},
                create: {
                    tipoAcesso: funcionarioTipoAcesso.enumerador,
                    login: funcionario.login,
                    senha: funcionario.senha,
                    funcionario: {
                        create: {
                            nome: funcionario.nome,
                            cargo: funcionario.cargo,
                            admin: funcionario.admin,
                        },
                    },
                },
            });
        }
        // StatusPedido
        const statusPedido1 = yield prisma.statusPedido.upsert({
            where: { enumerador: 'Recebido' },
            update: {},
            create: {
                enumerador: 'Recebido',
            },
        });
        const statusPedido2 = yield prisma.statusPedido.upsert({
            where: { enumerador: 'Em preparação' },
            update: {},
            create: {
                enumerador: 'Em preparação',
            },
        });
        const statusPedido3 = yield prisma.statusPedido.upsert({
            where: { enumerador: 'Pronto' },
            update: {},
            create: {
                enumerador: 'Pronto',
            },
        });
        const statusPedido4 = yield prisma.statusPedido.upsert({
            where: { enumerador: 'Finalizado' },
            update: {},
            create: {
                enumerador: 'Finalizado',
            },
        });
        // StatusPagamento
        const statusPagamento1 = yield prisma.statusPagamento.upsert({
            where: { enumerador: 'Aguardando' },
            update: {},
            create: {
                enumerador: 'Aguardando',
            },
        });
        const statusPagamento2 = yield prisma.statusPagamento.upsert({
            where: { enumerador: 'Pago' },
            update: {},
            create: {
                enumerador: 'Pago',
            },
        });
        const statusPagamento3 = yield prisma.statusPagamento.upsert({
            where: { enumerador: 'Não Pago' },
            update: {},
            create: {
                enumerador: 'Não Pago',
            },
        });
        // CategoriaProduto
        const categoriaProduto1 = yield prisma.categoriaProduto.upsert({
            where: { enumerador: 'Lanche' },
            update: {},
            create: {
                enumerador: 'Lanche',
            },
        });
        const categoriaProduto2 = yield prisma.categoriaProduto.upsert({
            where: { enumerador: 'Acompanhamento' },
            update: {},
            create: {
                enumerador: 'Acompanhamento',
            },
        });
        const categoriaProduto3 = yield prisma.categoriaProduto.upsert({
            where: { enumerador: 'Bebida' },
            update: {},
            create: {
                enumerador: 'Bebida',
            },
        });
        const categoriaProduto4 = yield prisma.categoriaProduto.upsert({
            where: { enumerador: 'Sobremesa' },
            update: {},
            create: {
                enumerador: 'Sobremesa',
            },
        });
        // Produtos
        const produto1 = yield prisma.produto.upsert({
            where: { id: 1 },
            update: {},
            create: {
                descricao: 'Hamburguer de bacon',
                preco: 10.99,
                categoriaProdutoId: categoriaProduto1.id,
            },
        });
        const produto2 = yield prisma.produto.upsert({
            where: { id: 2 },
            update: {},
            create: {
                descricao: 'Hamburguer de costela',
                preco: 12.99,
                categoriaProdutoId: categoriaProduto1.id,
            },
        });
        const produto3 = yield prisma.produto.upsert({
            where: { id: 3 },
            update: {},
            create: {
                descricao: 'Hot dog',
                preco: 7.99,
                categoriaProdutoId: categoriaProduto1.id,
            },
        });
        const produto4 = yield prisma.produto.upsert({
            where: { id: 4 },
            update: {},
            create: {
                descricao: 'Batata frita rustica',
                preco: 6.99,
                categoriaProdutoId: categoriaProduto2.id,
            },
        });
        const produto5 = yield prisma.produto.upsert({
            where: { id: 5 },
            update: {},
            create: {
                descricao: 'Batata frita palito',
                preco: 6.99,
                categoriaProdutoId: categoriaProduto2.id,
            },
        });
        const produto6 = yield prisma.produto.upsert({
            where: { id: 6 },
            update: {},
            create: {
                descricao: 'Refrigerante lata',
                preco: 5.99,
                categoriaProdutoId: categoriaProduto3.id,
            },
        });
        const produto7 = yield prisma.produto.upsert({
            where: { id: 7 },
            update: {},
            create: {
                descricao: 'Refrigerante 600ml',
                preco: 8.50,
                categoriaProdutoId: categoriaProduto3.id,
            },
        });
        // Cardápio
        const cardapio = yield prisma.cardapio.upsert({
            where: { id: 1 },
            update: {},
            create: {
                descricao: 'Cardápio Principal',
                ativo: true,
            },
        });
        // Produtos do Cardápio (associando produtos existentes aos cardápios)
        const produtosDoCardapio = [
            { id: 1, produtoId: produto1.id, cardapioId: cardapio.id },
            { id: 2, produtoId: produto2.id, cardapioId: cardapio.id },
            { id: 3, produtoId: produto3.id, cardapioId: cardapio.id },
            { id: 4, produtoId: produto4.id, cardapioId: cardapio.id },
            { id: 5, produtoId: produto5.id, cardapioId: cardapio.id },
            { id: 6, produtoId: produto6.id, cardapioId: cardapio.id },
            { id: 7, produtoId: produto7.id, cardapioId: cardapio.id }
        ];
        for (const produtoDoCardapio of produtosDoCardapio) {
            yield prisma.produtosDoCardapio.upsert({
                where: {
                    produtoId_cardapioId_id: {
                        produtoId: produtoDoCardapio.produtoId,
                        cardapioId: produtoDoCardapio.cardapioId,
                        id: produtoDoCardapio.id,
                    },
                },
                update: {},
                create: {
                    produtoId: produtoDoCardapio.produtoId,
                    cardapioId: produtoDoCardapio.cardapioId,
                },
            });
        }
        // Pedidos
        const pedido1 = yield prisma.pedido.upsert({
            where: { id: 1 },
            update: {},
            create: {
                clienteId: cliente1.id,
                statusPedidoId: statusPedido1.id
            },
        });
        const pedido2 = yield prisma.pedido.upsert({
            where: { id: 2 },
            update: {},
            create: {
                clienteId: cliente2.id,
                statusPedidoId: statusPedido1.id
            },
        });
        const pedido3 = yield prisma.pedido.upsert({
            where: { id: 3 },
            update: {},
            create: {
                clienteId: cliente3.id,
                statusPedidoId: statusPedido3.id
            },
        });
        const pedido4 = yield prisma.pedido.upsert({
            where: { id: 4 },
            update: {},
            create: {
                clienteId: cliente4.id,
                statusPedidoId: statusPedido4.id
            },
        });
        const pedido5 = yield prisma.pedido.upsert({
            where: { id: 5 },
            update: {},
            create: {
                clienteId: cliente5.id,
                statusPedidoId: statusPedido2.id
            },
        });
        // Produtos do Pedido
        const produtosDoPedidoData = [
            { id: 1, produtoId: produto1.id, pedidoId: pedido1.id, quantidade: 1, valor: 10.99 },
            { id: 2, produtoId: produto4.id, pedidoId: pedido1.id, quantidade: 1, valor: 6.99 },
            { id: 3, produtoId: produto6.id, pedidoId: pedido1.id, quantidade: 1, valor: 5.99 }, //pedido 1 -> 23.97
            { id: 4, produtoId: produto5.id, pedidoId: pedido2.id, quantidade: 2, valor: 13.98 },
            { id: 5, produtoId: produto7.id, pedidoId: pedido2.id, quantidade: 1, valor: 8.50 }, //pedido 2 -> 22.48
            { id: 6, produtoId: produto2.id, pedidoId: pedido3.id, quantidade: 1, valor: 12.99 },
            { id: 7, produtoId: produto3.id, pedidoId: pedido3.id, quantidade: 1, valor: 7.99 },
            { id: 8, produtoId: produto4.id, pedidoId: pedido3.id, quantidade: 1, valor: 6.99 },
            { id: 9, produtoId: produto7.id, pedidoId: pedido3.id, quantidade: 1, valor: 8.50 }, //pedido 3 -> 36.47
            { id: 10, produtoId: produto6.id, pedidoId: pedido4.id, quantidade: 5, valor: 29.95 },
            { id: 11, produtoId: produto3.id, pedidoId: pedido4.id, quantidade: 5, valor: 39.95 }, //pedido 4 -> 69.90
            { id: 12, produtoId: produto7.id, pedidoId: pedido5.id, quantidade: 1, valor: 8.50 }, //pedido 5 -> 8.50
        ];
        for (const produtoDoPedidoData of produtosDoPedidoData) {
            yield prisma.produtosDoPedido.upsert({
                where: {
                    produtoId_pedidoId_id: {
                        produtoId: produtoDoPedidoData.produtoId,
                        pedidoId: produtoDoPedidoData.pedidoId,
                        id: produtoDoPedidoData.id,
                    },
                },
                update: {},
                create: produtoDoPedidoData,
            });
        }
        // Pagamento
        const pagamento1 = yield prisma.pagamento.upsert({
            where: { id: 1 },
            update: {},
            create: {
                pedidoId: pedido1.id,
                statusPagamentoId: statusPagamento1.id,
                tipo: 'Cartão de Crédito',
                data: new Date(),
                valor: 23.97,
            },
        });
        const pagamento2 = yield prisma.pagamento.upsert({
            where: { id: 2 },
            update: {},
            create: {
                pedidoId: pedido2.id, // Pedido aguardando
                statusPagamentoId: statusPagamento3.id, // Não Pago
                tipo: 'Cartão de Débito',
                data: new Date(),
                valor: 22.48,
            },
        });
        const pagamento3 = yield prisma.pagamento.upsert({
            where: { id: 3 },
            update: {},
            create: {
                pedidoId: pedido2.id, // Pedido aguardando
                statusPagamentoId: statusPagamento2.id, // Pago
                tipo: 'Cartão de Débito',
                data: new Date(),
                valor: 22.48,
            },
        });
        const pagamento4 = yield prisma.pagamento.upsert({
            where: { id: 4 },
            update: {},
            create: {
                pedidoId: pedido3.id,
                statusPagamentoId: statusPagamento2.id,
                tipo: 'Pix',
                data: new Date(),
                valor: 36.47,
            },
        });
        const pagamento5 = yield prisma.pagamento.upsert({
            where: { id: 5 },
            update: {},
            create: {
                pedidoId: pedido4.id,
                statusPagamentoId: statusPagamento2.id,
                tipo: 'Dinheiro',
                data: new Date(),
                valor: 69.90,
            },
        });
        const pagamento6 = yield prisma.pagamento.upsert({
            where: { id: 6 },
            update: {},
            create: {
                pedidoId: pedido5.id,
                statusPagamentoId: statusPagamento2.id,
                tipo: 'Cartão de Crédito',
                data: new Date(),
                valor: 8.50,
            },
        });
        console.log('Seed data upserted.');
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
