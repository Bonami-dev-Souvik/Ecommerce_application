/*
  Warnings:

  - Added the required column `address` to the `Order_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order_history" ADD COLUMN     "address" TEXT NOT NULL;
