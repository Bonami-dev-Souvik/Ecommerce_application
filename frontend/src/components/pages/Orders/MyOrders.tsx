import { useState, useEffect } from "react";
import { fetchOrderHistory } from "../../../api/order";
import './MyOrders.scss'

interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
}

interface Order {
  orderId: number;
  address: string;
  orderDate: string;
  product: Product;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = 1; // Replace with actual user ID, e.g., from Context API

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrderHistory(userId);
        setOrders(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="orders-container">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
            <p>No orders found</p>
        ) : (
            <div className="cards-container">
                {orders.map((order) => (
                    <div key={order.orderId} className="order-card">
                        <img
                            src={order.product.image}
                            alt={order.product.title}
                            className="order-image"
                        />
                        <h3 className="order-title">{order.product.title}</h3>
                        <p className="order-description">{order.product.description}</p>
                        <p className="order-price">Price: ${order.product.price}</p>
                        <p className="order-address">Address: {order.address}</p>
                        <p className="order-date">
                            Order Date: {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default MyOrders;
