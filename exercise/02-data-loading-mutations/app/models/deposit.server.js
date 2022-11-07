import { prisma } from "~/db.server";

export async function getDepositListItems() {
  const deposits = await prisma.deposit.findMany({
    orderBy: {
      depositDate: "desc",
    },
    select: {
      id: true,
      depositDate: true,
      amount: true,
      invoice: {
        select: {
          id: true,
          number: true,
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return deposits.map((d) => ({
    ...d,
    depositDateFormatted: d.depositDate.toLocaleDateString(),
  }));
}

export async function getDepositDetails(depositId) {
  return prisma.deposit.findFirst({
    where: { id: depositId },
    select: { note: true },
  });
}

export async function createDeposit(data) {
  return prisma.deposit.create({ data });
}

export async function deleteDeposit(id) {
  return prisma.deposit.delete({ where: { id } });
}
