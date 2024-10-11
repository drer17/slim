/*
  Warnings:

  - You are about to drop the column `location` on the `Document` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "label" TEXT NOT NULL,
    "tooltip" TEXT,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "id", "label", "portfolioId", "starred", "tooltip") SELECT "createdAt", "id", "label", "portfolioId", "starred", "tooltip" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
