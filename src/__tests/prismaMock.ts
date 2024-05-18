const prisma = require('./prisma'); // Import your Prisma instance

async function createUser(name: any, email: any) {
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  });
}

async function getUserById(id: any) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

module.exports = {
  createUser,
  getUserById,
};