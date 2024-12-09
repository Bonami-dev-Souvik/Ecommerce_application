import axios from "axios";
import { CartError } from "../types/cart";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/add`,
      { userId, productId, quantity },
      { withCredentials: true }
    );
  } catch (error) {
    const errorMessage =
      (error as CartError).response?.data?.message || "Failed to add item to cart";
    throw new Error(errorMessage);
  }
};



export const fetchCartItems = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/${userId}`, {
    withCredentials: true,
  });
  return response.data.cartItems;
};

export const updateCartItem = async (cartId: number, quantity: number) => {
  const response = await axios.put(
    `${BASE_URL}/update`,
    { cartId, quantity },
    { withCredentials: true }
  );
  return response.data.updatedCartItem;
};

export const removeCartItem = async (cartId: number) => {
  const response = await axios.delete(`${BASE_URL}/remove`, {
    data: { cartId },
    withCredentials: true,
  });
  return response.data.removedCartItem;
};
