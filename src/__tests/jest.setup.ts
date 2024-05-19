import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
// Instancia global do Prisma Client para os testes
const prisma = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;;

// Conecta ao banco de dados antes de todos os testes
beforeAll(async () => {
});

// Desconecta do banco de dados após todos os testes
afterAll(async () => {
});

// Limpa o banco de dados antes de cada teste
beforeEach(async () => {
    // Adapte para limpar as tabelas relevantes
    // await prisma.pedido.deleteMany({});
    // ... outras entidades
});

// Exporta a instância do Prisma para uso nos testes
export { prisma };