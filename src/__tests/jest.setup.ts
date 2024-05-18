import { PrismaClient } from '@prisma/client';

// Instancia global do Prisma Client para os testes
const prisma = new PrismaClient();

// Conecta ao banco de dados antes de todos os testes
beforeAll(async () => {
    await prisma.$connect();
});

// Desconecta do banco de dados após todos os testes
afterAll(async () => {
    await prisma.$disconnect();
});

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
    // Adapte para limpar as tabelas relevantes
    // await prisma.pedido.deleteMany({});
    // ... outras entidades
});

// Exporta a instância do Prisma para uso nos testes
export { prisma };