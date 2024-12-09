import axios from "axios";
import { AddressError } from "../types/address";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all addresses for a user
export const getAddresses = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/addresses`, {
      withCredentials: true,
    });

    console.log("address.ts ---- These are the lists of addresses of this user ", response)
    const addresses = response.data.filter((address: { isDeleted?: boolean }) => !address.isDeleted); 
    return addresses;
  } catch (error) {
    const errorMessage =
      (error as AddressError).response?.data?.message || "Failed to fetch addresses.";
    throw new Error(errorMessage);
  }
};

// Create a new address
export const createAddress = async (
  userId: number,
  addressData: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isPrimary: boolean;
  }
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/addresses`,
      addressData,
      { withCredentials: true }
    );
    return response.data.address;
  } catch (error) {
    const errorMessage =
      (error as AddressError).response?.data?.message || "Failed to create address.";
    throw new Error(errorMessage);
  }
};

// Edit an existing address
export const editAddress = async (
  userId: number,
  addressId: number,
  updatedData: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isPrimary?: boolean;
  }
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${userId}/addresses/${addressId}`,
      updatedData,
      { withCredentials: true }
    );
    return response.data.address;
  } catch (error) {
    const errorMessage =
      (error as AddressError).response?.data?.message || "Failed to edit address.";
    throw new Error(errorMessage);
  }
};

// Delete an address
export const removeAddress = async (userId: number, addressId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${userId}/addresses/${addressId}`,
      { withCredentials: true }
    );
    return response.data.message;
  } catch (error) {
    const errorMessage =
      (error as AddressError).response?.data?.message || "Failed to remove address.";
    throw new Error(errorMessage);
  }
};
