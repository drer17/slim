/*
  Warnings:

  - You are about to drop the column `obligationId` on the `ObligationRule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Obligation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "entityId" TEXT,
    "assetLiabilityId" TEXT,
    "obligationRuleId" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Obligation_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Obligation_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Obligation_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Obligation_obligationRuleId_fkey" FOREIGN KEY ("obligationRuleId") REFERENCES "ObligationRule" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Obligation" ("archivedAt", "assetLiabilityId", "color", "createdAt", "description", "entityId", "icon", "id", "label", "portfolioId", "starred") SELECT "archivedAt", "assetLiabilityId", "color", "createdAt", "description", "entityId", "icon", "id", "label", "portfolioId", "starred" FROM "Obligation";
DROP TABLE "Obligation";
ALTER TABLE "new_Obligation" RENAME TO "Obligation";
CREATE TABLE "new_ObligationRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "frequency" INTEGER NOT NULL,
    "frequencyUnits" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME
);
INSERT INTO "new_ObligationRule" ("amount", "endDate", "frequency", "frequencyUnits", "id", "startDate") SELECT "amount", "endDate", "frequency", "frequencyUnits", "id", "startDate" FROM "ObligationRule";
DROP TABLE "ObligationRule";
ALTER TABLE "new_ObligationRule" RENAME TO "ObligationRule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
