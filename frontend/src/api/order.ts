import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrder = async (
  userId: number,
  addressId: number,
  cartItems: { productId: number; quantity: number }[]
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/order-placed`,
      {
        userId,
        addressId,
        cartItems, // to send all cart items in a single request
      },
      { withCredentials: true }
    );

    console.log("cart items response:", cartItems);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error("Failed to place the order.");
  }
};


export const fetchOrderHistory = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/order-history/${userId}`,{withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};
