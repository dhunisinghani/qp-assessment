/*
  Warnings:

  - Added the required column `quantity` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("id", "orderId", "productId") SELECT "id", "orderId", "productId" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
