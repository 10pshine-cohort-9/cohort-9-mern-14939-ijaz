import prisma from "../config/db";

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  username: string;
}) {
  return prisma.user.create({
    data,
  });
}
