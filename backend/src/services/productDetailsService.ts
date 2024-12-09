import prisma from "../connection/connection_pool";

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};
