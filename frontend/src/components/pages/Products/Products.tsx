import { Products as ProductType } from "../../../types/products";
import { fetchAllProducts } from "../../../api/products";
import { addToCart } from "../../../api/cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import styles from "../../../styles/components/pages/Products.module.scss";

function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cartError, setCartError] = useState<string>("");
  const [cartSuccess, setCartSuccess] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useUserContext();

  console.log("Products - user from useContext:", user);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    setCartError("");
    setCartSuccess("");
    try {
      if (user) {
        await addToCart(user.id, productId, 1);
        setCartSuccess("Item added to cart successfully!");
      } else {
        setCartError("User not authenticated");
      }
    } catch (err) {
      console.log("Error while adding product to the cart ", err);
      setCartError((err as Error).message);
    }
  };

  const handleDetails = (id: number) => {
    navigate(`/product/${id}`);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading products...</p>; // custom loader compoentn here **todo
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className={styles["full-screen"]}>
      <div className={styles["products-container"]}>
        <h1 className={styles["products-title"]}>Products</h1>
        {cartError && <p className={styles["error-message"]}>{cartError}</p>}
        {cartSuccess && <p className={styles["success-message"]}>{cartSuccess}</p>}

        <div className={styles["products-grid"]}>
          {products.map((product) => (
            <div key={product.id} className={styles["product-card"]}>
              <img
                src={product.image}
                alt={product.title}
                className={styles["product-image"]}
              />
              <div className={styles["product-image"]}>
                <h2 className={styles["product-title"]}>{product.title}</h2>
                <p className={styles["product-description"]}>{product.description.split(" ").slice(0,20).join(" ")}...
                </p>
                <p className={styles["product-category"]}>Category: {product.category}</p>
                <p className={styles["product-price"]}>Price: ${product.price}</p>
                <p className={styles["product-rating"]}>
                  Rating: {product.ratingRate} ({product.ratingCount} reviews)
                </p>
                <button
                  className={styles['details-button']}
                  onClick={() => handleDetails(product.id)}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className={styles["add-to-cart-button"]}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
