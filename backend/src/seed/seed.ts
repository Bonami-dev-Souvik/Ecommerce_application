import prisma from '../connection/connection_pool'
import axios from "axios";
import { Request, Response } from "express";


export async function main(req: Request, res: Response) {
  try {
    const { data: products } = await axios.get("https://fakestoreapi.com/products");

    const mappedProducts = products.map((product: any) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      ratingRate: product.rating.rate,
      ratingCount: product.rating.count,
    }));

    await prisma.product.createMany({
      data: mappedProducts,
      // skipDuplicates: true, // this Avoids inserting duplicates if the script is re-run
    });

    console.log("Seeding completed successfully!");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error seeding the database:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}


