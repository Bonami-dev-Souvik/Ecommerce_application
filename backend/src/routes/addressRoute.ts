import express from "express";
import {
  getAddresses,
  createAddress,
  editAddress,
  removeAddress,
} from "../controllers/addressController";

const addressRoute = express.Router();

addressRoute.get("/:userId/addresses", getAddresses);
addressRoute.post("/:userId/addresses", createAddress);
addressRoute.put("/:userId/addresses/:addressId", editAddress);
addressRoute.delete("/:userId/addresses/:addressId", removeAddress);

export default addressRoute;
