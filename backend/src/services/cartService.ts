import prisma from "../connection/connection_pool";

// to increment prodct quantity or add to cart 
export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<any> => {
  try {
    const existingItem = await prisma.cart.findFirst({
      where: { userId, productId, removedAt: null },
    });

    if (existingItem) {
      return await prisma.cart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return await prisma.cart.create({
      data: { userId, productId, quantity },
    });
  } catch (error) {
    throw new Error("Error adding to cart: " + error);
  }
};

// to get all the active cart items of the user
export const getCartItems = async (userId: number): Promise<any> => {
  try {
    return await prisma.cart.findMany({
      where: { userId, removedAt: null },
      include: { product: true }, 
    });
  } catch (error) {
    throw new Error("Error fetching cart: " + error);
  }
};

// Update cart item quantity
export const updateCartItem = async (
  cartId: number,
  newQuantity: number
): Promise<any> => {
  try {
    return await prisma.cart.update({
      where: { id: cartId },
      data: { quantity: newQuantity },
    });
  } catch (error) {
    throw new Error("Error updating cart: " + error);
  }
};

// Soft delete cart item (set removedAt)
export const removeCartItem = async (cartId: number): Promise<any> => {
  try {
    return await prisma.cart.update({
      where: { id: cartId },
      data: { removedAt: new Date() },
    });
  } catch (error) {
    throw new Error("Error removing item from cart: " + error);
  }
};

// **todo later if I want to restore a soft-deleted cart item
export const restoreCartItem = async (cartId: number): Promise<any> => {
  try {
    return await prisma.cart.update({
      where: { id: cartId },
      data: { removedAt: null },
    });
  } catch (error) {
    throw new Error("Error restoring item to cart: " + error);
  }
};
