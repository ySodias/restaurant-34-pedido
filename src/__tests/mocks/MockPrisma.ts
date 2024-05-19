import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

const prismaMock = mockDeep<PrismaClient>();


jest.mock('@prisma/client', () => ({
    __esModule: true,
    default: prismaMock,
}));


beforeEach(() => {
    mockReset(prismaMock)
})

export { prismaMock }