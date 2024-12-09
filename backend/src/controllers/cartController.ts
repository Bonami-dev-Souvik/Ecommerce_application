import { Request, Response } from 'express';
import * as cartService from '../services/cartService';

// to add to a cart
export const addToCartController = async (req: Request, res: Response): Promise<any> => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'User ID, Product ID, and Quantity are required' });
  }

  try {
    const cartItem = await cartService.addToCart(userId, productId, quantity);
    return res.status(201).json({ message: 'Item added to cart successfully', cartItem });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ message: 'Error adding item to cart' });
  }
};

// to get all cart items according to the user
export const getCartItemsController = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const cartItems = await cartService.getCartItems(parseInt(userId));
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Get cart items error:', error);
    return res.status(500).json({ message: 'Error fetching cart items' });
  }
};

// to update the quantity of a cart item
export const updateCartItemController = async (req: Request, res: Response): Promise<any> => {
  const { cartId, quantity } = req.body;

  if (!cartId || !quantity) {
    return res.status(400).json({ message: 'Cart ID and Quantity are required' });
  }

  try {
    const updatedCartItem = await cartService.updateCartItem(cartId, quantity);
    return res.status(200).json({ message: 'Cart item updated successfully', updatedCartItem });
  } catch (error) {
    console.error('Update cart item error:', error);
    return res.status(500).json({ message: 'Error updating cart item' });
  }
};

// to remove or (soft delete) a cart item
export const removeCartItemController = async (req: Request, res: Response): Promise<any> => {
  const { cartId } = req.body;

  if (!cartId) {
    return res.status(400).json({ message: 'Cart ID is required' });
  }

  try {
    const removedCartItem = await cartService.removeCartItem(cartId);
    return res.status(200).json({ message: 'Cart item removed successfully', removedCartItem });
  } catch (error) {
    console.error('Remove cart item error:', error);
    return res.status(500).json({ message: 'Error removing cart item' });
  }
};

// **todo to restore a soft-deleted cart item 
export const restoreCartItemController = async (req: Request, res: Response): Promise<any> => {
  const { cartId } = req.body;

  if (!cartId) {
    return res.status(400).json({ message: 'Cart ID is required' });
  }

  try {
    const restoredCartItem = await cartService.restoreCartItem(cartId);
    return res.status(200).json({ message: 'Cart item restored successfully', restoredCartItem });
  } catch (error) {
    console.error('Restore cart item error:', error);
    return res.status(500).json({ message: 'Error restoring a cart item' });
  }
};
