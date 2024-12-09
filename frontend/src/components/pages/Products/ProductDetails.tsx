import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../api/products";
import { ProductDetail } from "../../../types/products";
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/components/pages/ProductDetails.module.scss'

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        if (id) {
          const productData = await fetchProductDetails(parseInt(id));
          setProduct(productData); 
          setLoading(false);
        }
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  const backButton = ()=>{
    navigate("/products")
  }

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles["full-screen"]}>
    <div className="product-details-container">
  {product && (
    <>
      <h1 className="product-title">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <p className="product-description">{product.description}</p>
      <p className="product-category">
        <span className="product-category-label">Category:</span> {product.category}
      </p>
      <p className="product-price">${product.price}</p>
      <p className="product-rating">
        <span className="product-rating-label">Rating:</span> {product.ratingRate} (
        {product.ratingCount} reviews)
      </p>
      <button onClick={backButton} className="back-button">
        Back
      </button>
      <button className="add-to-cart-button">Add To Cart</button>
    </>
  )}
</div>

</div>

  );
};

export default ProductDetails;