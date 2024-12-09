import prisma from '../connection/connection_pool';

export const getUserOrders = async (userId: number) => {
    try {
      // Fetching orders for the given userId
      const orders = await prisma.order_history.findMany({
        where: { userId }, 
        include: {
          product: true,
        },
      });
  
      return orders;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error}`);
    }
  };
  