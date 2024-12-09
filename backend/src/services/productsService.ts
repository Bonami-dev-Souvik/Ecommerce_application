import prisma from "../connection/connection_pool";  

export const getAllProducts = async () => {
  return await prisma.product.findMany();  
};
