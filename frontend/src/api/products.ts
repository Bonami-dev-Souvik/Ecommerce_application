import axios from "axios";
import { Products, ProductsError } from "../types/products";
import { ProductDetail, ProductDetailError } from "../types/products";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllProducts = async (): Promise<Products[]> => {
  try {
    const response = await axios.get<Products[]>(`${BASE_URL}/all-products`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      (error as ProductsError).response?.data?.message ||
      "Failed to fetch products";
    throw new Error(errorMessage);
  }
};

export const fetchProductDetails = async (
  id: number
): Promise<ProductDetail> => {
  try {
    const response = await axios.get<ProductDetail>(
      `${BASE_URL}/product/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log("This is the response of the product detail", response);
    return response.data;
  } catch (error) {
    const errorMessage =
      (error as ProductDetailError).response?.data?.message ||
      "Failed to fetch product details";
    throw new Error(errorMessage);
  }
};
