-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AttributeLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attributeId" TEXT NOT NULL,
    "assetLiabilityTypeId" TEXT,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    CONSTRAINT "AttributeLink_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_assetLiabilityTypeId_fkey" FOREIGN KEY ("assetLiabilityTypeId") REFERENCES "AssetLiabilityType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AttributeLink" ("assetLiabilityId", "assetLiabilityTypeId", "attributeId", "entityId", "id", "obligationId") SELECT "assetLiabilityId", "assetLiabilityTypeId", "attributeId", "entityId", "id", "obligationId" FROM "AttributeLink";
DROP TABLE "AttributeLink";
ALTER TABLE "new_AttributeLink" RENAME TO "AttributeLink";
CREATE TABLE "new_DocumentLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    "transactionId" TEXT,
    "occurrenceId" TEXT,
    "valuationId" TEXT,
    CONSTRAINT "DocumentLink_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_valuationId_fkey" FOREIGN KEY ("valuationId") REFERENCES "Valuation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DocumentLink" ("assetLiabilityId", "documentId", "entityId", "id", "obligationId", "occurrenceId", "transactionId", "valuationId") SELECT "assetLiabilityId", "documentId", "entityId", "id", "obligationId", "occurrenceId", "transactionId", "valuationId" FROM "DocumentLink";
DROP TABLE "DocumentLink";
ALTER TABLE "new_DocumentLink" RENAME TO "DocumentLink";
CREATE TABLE "new_NoteLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    "transactionId" TEXT,
    "occurrenceId" TEXT,
    "valuationId" TEXT,
    CONSTRAINT "NoteLink_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_valuationId_fkey" FOREIGN KEY ("valuationId") REFERENCES "Valuation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NoteLink" ("assetLiabilityId", "entityId", "id", "noteId", "obligationId", "occurrenceId", "transactionId", "valuationId") SELECT "assetLiabilityId", "entityId", "id", "noteId", "obligationId", "occurrenceId", "transactionId", "valuationId" FROM "NoteLink";
DROP TABLE "NoteLink";
ALTER TABLE "new_NoteLink" RENAME TO "NoteLink";
CREATE TABLE "new_ObligationRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obligationId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "frequency" INTEGER NOT NULL,
    "frequencyUnits" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    CONSTRAINT "ObligationRule_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ObligationRule" ("amount", "endDate", "frequency", "frequencyUnits", "id", "obligationId", "startDate") SELECT "amount", "endDate", "frequency", "frequencyUnits", "id", "obligationId", "startDate" FROM "ObligationRule";
DROP TABLE "ObligationRule";
ALTER TABLE "new_ObligationRule" RENAME TO "ObligationRule";
CREATE TABLE "new_PortfolioUsers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "PortfolioUsers_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PortfolioUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PortfolioUsers" ("id", "portfolioId", "role", "userId") SELECT "id", "portfolioId", "role", "userId" FROM "PortfolioUsers";
DROP TABLE "PortfolioUsers";
ALTER TABLE "new_PortfolioUsers" RENAME TO "PortfolioUsers";
CREATE TABLE "new_TagLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tagId" TEXT NOT NULL,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    "transactionId" TEXT,
    "occurrenceId" TEXT,
    "valuationId" TEXT,
    "documentId" TEXT,
    "noteId" TEXT,
    CONSTRAINT "TagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_valuationId_fkey" FOREIGN KEY ("valuationId") REFERENCES "Valuation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TagLink" ("assetLiabilityId", "documentId", "entityId", "id", "noteId", "obligationId", "occurrenceId", "tagId", "transactionId", "valuationId") SELECT "assetLiabilityId", "documentId", "entityId", "id", "noteId", "obligationId", "occurrenceId", "tagId", "transactionId", "valuationId" FROM "TagLink";
DROP TABLE "TagLink";
ALTER TABLE "new_TagLink" RENAME TO "TagLink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
