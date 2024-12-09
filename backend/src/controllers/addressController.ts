import { Request, Response } from "express";
import {
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../services/addressService";

export const getAddresses = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const addresses = await getUserAddresses(userId);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses." });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const addressData = req.body;

  try {
    const address = await addAddress(userId, addressData);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: "Failed to create address." });
  }
};

export const editAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.addressId);
  const userId = parseInt(req.params.userId);
  const addressData = req.body;

  try {
    const updatedAddress = await updateAddress(addressId, userId, addressData);
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update address." });
  }
};

export const removeAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.addressId);

  try {
    await deleteAddress(addressId);
    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address." });
  }
};
