import { useEffect, useState } from "react";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
} from "../../../api/cart";
import { getAddresses } from "../../../api/address";
import { placeOrder } from "../../../api/order";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from 'react-router-dom'
import './MyCart.scss';


type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
};

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
};


const MyCart = () => {
  const { user } = useUserContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      loadCartItems(user.id);
      loadAddresses();
    }
  }, [user?.id]);

  const loadCartItems = async (userId: number) => {
    try {
      setLoading(true);
      const items = await fetchCartItems(userId);

      console.log(
        "these aer the items that are present in the response",
        items
      );
      setCartItems(items);
      setLoading(false);
    } catch (err) {
      setError("Failed to load cart items.");
      console.log(err);
      setLoading(false);
      console.log(addresses) // optimize
    }
  };

  const loadAddresses = async () => {
    if (!user?.id) return; 
    try {
      setLoading(true);
      const fetchedAddresses = await getAddresses(user.id);
      console.log("userAddresses fetched addresses",fetchedAddresses)
      setAddresses(fetchedAddresses || []); 
    } catch (err) {
      setError("Failed to load addresses.");
      console.error("Error loading addresses:", err);
      setSelectedAddressId(1)
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartId: number, quantity: number) => {
    try {
      const updatedItem = await updateCartItem(cartId, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === updatedItem.id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        )
      );
    } catch {
      setError("Failed to update cart item.");
    }
  };

  const handleRemoveItem = async (cartId: number) => {
    try {
      await removeCartItem(cartId);
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch {
      setError("Failed to remove cart item.");
    }
  };

  const handleCheckout = async () => {
    if (!user?.id || !selectedAddressId) {
      setError("Please select a shipping address.");
      return;
    }
  
    if (cartItems.length === 0) {
      setError("No items in the cart to checkout.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Prepare cart items for API request
      const cartPayload = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
  
      // Single API call to place the order
      const response = await placeOrder(user.id, selectedAddressId, cartPayload);
      console.log("mycart.tsx-- response", response)
      // Clear cart on successful checkout
      setCartItems([]);
      setLoading(false);
      alert("Checkout successful!");
      navigate('/my-cart'); 
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Failed to complete checkout. Please try again.");
      setLoading(false);
    }
  };
  


  const handleBack = () =>{
    navigate('/products')
  }

  if (loading)
    return <p className="text-center text-lg">Loading your cart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (

<div className="cart-container">
    <h1>My Cart</h1>
    {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
    ) : (
        <div className="cart-items">
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <img
                        src={item.product.image}
                        alt={item.product.title}
                    />
                    <div className="item-details">
                        <h2>{item.product.title}</h2>
                        <p>Price: ${item.product.price}</p>
                        <div className="quantity-controls">
                            <button
                                onClick={() =>
                                    handleUpdateQuantity(
                                        item.id,
                                        Math.max(1, item.quantity - 1)
                                    )
                                }
                                className="decrement"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() =>
                                    handleUpdateQuantity(item.id, item.quantity + 1)
                                }
                                className="increment"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-button"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    )}

    {/* Shipping Address Selection */}
    <div className="shipping-address">
        <h3>Select Shipping Address</h3>
        {addresses.length > 0 ? (
            <select
                value={selectedAddressId || ""}
                onChange={(e) => setSelectedAddressId(Number(e.target.value))}
            >
                <option value="">Select an Address</option>
                {addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                        {address.street}, {address.city}, {address.state}, {address.country}
                    </option>
                ))}
            </select>
        ) : (
            <p className="no-addresses-message">No addresses available.</p>
        )}
    </div>

    {/* Action Buttons */}
    <div className="action-buttons">
        <button onClick={handleBack} className="back-button">Back</button>
        <button
            onClick={handleCheckout}
            className="checkout-button"
        >
            {loading ? "Processing..." : "Checkout"}
        </button>
    </div>

    {error && <p className="error-message">{error}</p>}
</div>
  );
};

export default MyCart;

// cart is visible after reloading the page --- bug fix