/*
  Warnings:

  - You are about to drop the column `liability` on the `AssetLiability` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AssetLiability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "assetTypeId" TEXT NOT NULL,
    "parentId" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "taxProfileId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "AssetLiability_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssetLiability_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetLiabilityType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssetLiability_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AssetLiability" ("archivedAt", "assetTypeId", "color", "createdAt", "description", "icon", "id", "label", "parentId", "portfolioId", "starred", "taxProfileId") SELECT "archivedAt", "assetTypeId", "color", "createdAt", "description", "icon", "id", "label", "parentId", "portfolioId", "starred", "taxProfileId" FROM "AssetLiability";
DROP TABLE "AssetLiability";
ALTER TABLE "new_AssetLiability" RENAME TO "AssetLiability";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
