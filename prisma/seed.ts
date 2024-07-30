import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // StatusPedido
    const statusPedido1 = await prisma.statusPedido.upsert({
        where: { enumerador: 'Recebido' },
        update: {},
        create: {
            enumerador: 'Recebido',
        },
    });

    const statusPedido2 = await prisma.statusPedido.upsert({
        where: { enumerador: 'Em preparação' },
        update: {},
        create: {
            enumerador: 'Em preparação',
        },
    });

    const statusPedido3 = await prisma.statusPedido.upsert({
        where: { enumerador: 'Pronto' },
        update: {},
        create: {
            enumerador: 'Pronto',
        },
    });

    const statusPedido4 = await prisma.statusPedido.upsert({
        where: { enumerador: 'Finalizado' },
        update: {},
        create: {
            enumerador: 'Finalizado',
        },
    });

    const statusPedido5 = await prisma.statusPedido.upsert({
        where: { enumerador: 'Aguardando Pagamento' },
        update: {},
        create: {
            enumerador: 'Aguardando Pagamento',
        },
    });

    const statusPedido6 = await prisma.statusPedido.upsert({
        where: { enumerador: 'Erro no Pagamento' },
        update: {},
        create: {
            enumerador: 'Erro no Pagamento',
        },
    });

    // Pedidos
    const pedido1 = await prisma.pedido.upsert({
        where: { id: 1 },
        update: {},
        create: {
            clienteId: 1,
            statusPedidoId: statusPedido1.id,
        },
    });

    const pedido2 = await prisma.pedido.upsert({
        where: { id: 2 },
        update: {},
        create: {
            clienteId: 1,
            statusPedidoId: statusPedido1.id
        },
    });

    const pedido3 = await prisma.pedido.upsert({
        where: { id: 3 },
        update: {},
        create: {
            clienteId: 2,
            statusPedidoId: statusPedido3.id
        },
    });

    const pedido4 = await prisma.pedido.upsert({
        where: { id: 4 },
        update: {},
        create: {
            clienteId: 3,
            statusPedidoId: statusPedido4.id
        },
    });

    const pedido5 = await prisma.pedido.upsert({
        where: { id: 5 },
        update: {},
        create: {
            clienteId: 4,
            statusPedidoId: statusPedido2.id
        },
    });

    // Produtos do Pedido
    const produtosDoPedidoData = [
        { id: 1, produtoId: 1, pedidoId: pedido1.id, quantidade: 1, valor: 10.99 },
        { id: 2, produtoId: 4, pedidoId: pedido1.id, quantidade: 1, valor: 6.99 },
        { id: 3, produtoId: 6, pedidoId: pedido1.id, quantidade: 1, valor: 5.99 }, //pedido 1 -> 23.97

        { id: 4, produtoId: 5, pedidoId: pedido2.id, quantidade: 2, valor: 13.98 },
        { id: 5, produtoId: 7, pedidoId: pedido2.id, quantidade: 1, valor: 8.50 }, //pedido 2 -> 22.48

        { id: 6, produtoId: 2, pedidoId: pedido3.id, quantidade: 1, valor: 12.99 },
        { id: 7, produtoId: 3, pedidoId: pedido3.id, quantidade: 1, valor: 7.99 },
        { id: 8, produtoId: 4, pedidoId: pedido3.id, quantidade: 1, valor: 6.99 },
        { id: 9, produtoId: 7, pedidoId: pedido3.id, quantidade: 1, valor: 8.50 }, //pedido 3 -> 36.47

        { id: 10, produtoId: 6, pedidoId: pedido4.id, quantidade: 5, valor: 29.95 },
        { id: 11, produtoId: 3, pedidoId: pedido4.id, quantidade: 5, valor: 39.95 }, //pedido 4 -> 69.90

        { id: 12, produtoId: 7, pedidoId: pedido5.id, quantidade: 1, valor: 8.50 }, //pedido 5 -> 8.50
    ]

    for (const produtoDoPedidoData of produtosDoPedidoData) {
        await prisma.produtosDoPedido.upsert({
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

    console.log('Seed data upserted.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });