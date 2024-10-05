/*
  Warnings:

  - You are about to drop the column `userId` on the `AssetLiability` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AssetLiabilityType` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Obligation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TransactionCategory` table. All the data in the column will be lost.
  - Added the required column `portfolioId` to the `AssetLiability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `AssetLiabilityType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `Obligation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `TransactionCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME
);

-- CreateTable
CREATE TABLE "PortfolioUsers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "PortfolioUsers_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PortfolioUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
INSERT INTO "new_AssetLiability" ("archivedAt", "assetTypeId", "color", "createdAt", "description", "icon", "id", "label", "parentId", "starred", "taxProfileId") SELECT "archivedAt", "assetTypeId", "color", "createdAt", "description", "icon", "id", "label", "parentId", "starred", "taxProfileId" FROM "AssetLiability";
DROP TABLE "AssetLiability";
ALTER TABLE "new_AssetLiability" RENAME TO "AssetLiability";
CREATE TABLE "new_AssetLiabilityType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "asset" BOOLEAN NOT NULL,
    CONSTRAINT "AssetLiabilityType_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AssetLiabilityType" ("asset", "color", "icon", "id", "label") SELECT "asset", "color", "icon", "id", "label" FROM "AssetLiabilityType";
DROP TABLE "AssetLiabilityType";
ALTER TABLE "new_AssetLiabilityType" RENAME TO "AssetLiabilityType";
CREATE TABLE "new_Attribute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tooltip" TEXT,
    CONSTRAINT "Attribute_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attribute" ("id", "label", "tooltip", "type", "value") SELECT "id", "label", "tooltip", "type", "value" FROM "Attribute";
DROP TABLE "Attribute";
ALTER TABLE "new_Attribute" RENAME TO "Attribute";
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "label" TEXT NOT NULL,
    "tooltip" TEXT,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "id", "label", "location", "starred", "tooltip") SELECT "createdAt", "id", "label", "location", "starred", "tooltip" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE TABLE "new_Entity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "assetLiabilityId" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "color" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isCompany" BOOLEAN NOT NULL DEFAULT false,
    "phone" INTEGER,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Entity_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Entity_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Entity" ("archivedAt", "assetLiabilityId", "color", "createdAt", "description", "email", "icon", "id", "isCompany", "name", "phone", "starred") SELECT "archivedAt", "assetLiabilityId", "color", "createdAt", "description", "email", "icon", "id", "isCompany", "name", "phone", "starred" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Note_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("createdAt", "id", "text") SELECT "createdAt", "id", "text" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Obligation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "entityId" TEXT,
    "assetLiabilityId" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Obligation_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Obligation_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Obligation_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Obligation" ("archivedAt", "assetLiabilityId", "color", "createdAt", "description", "entityId", "icon", "id", "label", "starred") SELECT "archivedAt", "assetLiabilityId", "color", "createdAt", "description", "entityId", "icon", "id", "label", "starred" FROM "Obligation";
DROP TABLE "Obligation";
ALTER TABLE "new_Obligation" RENAME TO "Obligation";
CREATE TABLE "new_Occurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obligationId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "obligationSatisfying" BOOLEAN NOT NULL DEFAULT false,
    "transactionId" TEXT,
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
    CONSTRAINT "Occurrence_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Occurrence_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Occurrence" ("amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "obligationSatisfying", "startDate", "startTime", "subject", "transactionId") SELECT "amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "obligationSatisfying", "startDate", "startTime", "subject", "transactionId" FROM "Occurrence";
DROP TABLE "Occurrence";
ALTER TABLE "new_Occurrence" RENAME TO "Occurrence";
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT,
    CONSTRAINT "Tag_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("color", "id", "label") SELECT "color", "id", "label" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_TransactionCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "parentId" TEXT,
    "assetId" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "expense" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "TransactionCategory_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransactionCategory_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TransactionCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TransactionCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TransactionCategory" ("assetId", "color", "expense", "icon", "id", "label", "parentId") SELECT "assetId", "color", "expense", "icon", "id", "label", "parentId" FROM "TransactionCategory";
DROP TABLE "TransactionCategory";
ALTER TABLE "new_TransactionCategory" RENAME TO "TransactionCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
