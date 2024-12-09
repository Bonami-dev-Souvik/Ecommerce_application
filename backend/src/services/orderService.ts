import prisma from '../connection/connection_pool';

export const placeOrder = async (userId: number, addressId: number): Promise<any> => {
  try {
    // Validate the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    // Validate the address exists and belongs to the user
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId, isDeleted: false },
    });
    if (!address) throw new Error('Address not found or invalid');

    // Fetch the user's active cart items
    const cartItems = await prisma.cart.findMany({
      where: { userId, removedAt: null },
      include: { product: true },
    });

    console.log("cart items from backend ", cartItems)

    if (cartItems.length === 0) {
      throw new Error('No items in the cart');
    }

    // Begin a transaction
    const order = await prisma.$transaction(async (prisma: any) => {
      // Loop through cart items and create order entries
      const orderHistories = await Promise.all(
        cartItems.map((item: {
          quantity: number; productId: number; 
} ) => {
          return prisma.order_history.create({
            data: {
              userId,
              productId: item.productId,
              address: `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`,
              quantity: item.quantity
            },
          });
        })
      );

      // Mark cart items as removed
      await prisma.cart.updateMany({
        where: { userId },
        data: { removedAt: new Date() },
      });

      return orderHistories;
    });

    return order;
  } catch (error) {
    console.error('Error placing order:', error);
    throw new Error('Error placing order: ' + error);
  }
};


export const getOrderHistoryByUser = async (userId: number) => {
  const orders = await prisma.order_history.findMany({
    where: {
      userId,
    },
    include: {
      product: true, // Include product details
    },
    orderBy: {
      orderDate: 'desc', // Sort orders by most recent first
    },
  });

  if (!orders) {
    throw new Error("No orders found for this user");
  }

  return orders;
};