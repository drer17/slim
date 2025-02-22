/*
  Warnings:

  - You are about to drop the `TransactionOccurrence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `obligationSatisfying` on the `Occurrence` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TransactionOccurrence";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Occurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obligationId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "satisfied" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT,
    "subject" TEXT,
    "description" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Occurrence_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Occurrence" ("amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "startDate", "startTime", "subject") SELECT "amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "startDate", "startTime", "subject" FROM "Occurrence";
DROP TABLE "Occurrence";
ALTER TABLE "new_Occurrence" RENAME TO "Occurrence";
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetLiabilityId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "categoryId" TEXT,
    "obligationId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Transaction_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "archivedAt", "assetLiabilityId", "categoryId", "createdAt", "date", "description", "id", "label") SELECT "amount", "archivedAt", "assetLiabilityId", "categoryId", "createdAt", "date", "description", "id", "label" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
