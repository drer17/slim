const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Andre",
      email: "testing@slim.com",
      password: "thisisbadpractise",
    },
  });

  const portfolio = await prisma.portfolio.create({
    data: {
      currency: "AUD",
      name: "default",
      description: "Default portfolio for user",
    },
  });

  await prisma.portfolioUsers.create({
    data: {
      portfolioId: portfolio.id,
      userId: user.id,
      role: "admin",
    },
  });

  const assetType = await prisma.assetLiabilityType.create({
    data: {
      label: "Bank Account",
      asset: true,
      portfolioId: portfolio.id,
    },
  });

  await prisma.assetLiability.create({
    data: {
      portfolioId: portfolio.id,
      assetTypeId: assetType.id,

      icon: "bank",
      label: "Transaction Account",
    },
  });
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
