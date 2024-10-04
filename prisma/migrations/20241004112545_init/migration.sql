-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD'
);

-- CreateTable
CREATE TABLE "AssetLiabilityType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "asset" BOOLEAN NOT NULL,
    CONSTRAINT "AssetLiabilityType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "assetId" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "expense" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "TransactionCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransactionCategory_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TransactionCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TransactionCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AssetLiability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
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
    CONSTRAINT "AssetLiability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssetLiability_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetLiabilityType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssetLiability_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Obligation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "entityId" TEXT,
    "assetLiabilityId" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "color" TEXT,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Obligation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Obligation_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Obligation_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
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
    CONSTRAINT "Entity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Entity_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetLiabilityId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Transaction_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Valuation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetLiabilityId" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Valuation_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Occurrence" (
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
    "userId" TEXT,
    CONSTRAINT "Occurrence_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Occurrence_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Occurrence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tooltip" TEXT,
    CONSTRAINT "Attribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT,
    CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "label" TEXT NOT NULL,
    "tooltip" TEXT,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ObligationRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obligationId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "frequency" INTEGER NOT NULL,
    "frequencyUnits" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    CONSTRAINT "ObligationRule_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AttributeLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attributeId" TEXT NOT NULL,
    "assetLiabilityTypeId" TEXT,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    CONSTRAINT "AttributeLink_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_assetLiabilityTypeId_fkey" FOREIGN KEY ("assetLiabilityTypeId") REFERENCES "AssetLiabilityType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AttributeLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NoteLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    "transactionId" TEXT,
    "occurrenceId" TEXT,
    "valuationId" TEXT,
    CONSTRAINT "NoteLink_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "NoteLink_valuationId_fkey" FOREIGN KEY ("valuationId") REFERENCES "Valuation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DocumentLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "assetLiabilityId" TEXT,
    "entityId" TEXT,
    "obligationId" TEXT,
    "transactionId" TEXT,
    "occurrenceId" TEXT,
    "valuationId" TEXT,
    CONSTRAINT "DocumentLink_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DocumentLink_valuationId_fkey" FOREIGN KEY ("valuationId") REFERENCES "Valuation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagLink" (
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
    CONSTRAINT "TagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagLink_assetLiabilityId_fkey" FOREIGN KEY ("assetLiabilityId") REFERENCES "AssetLiability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_valuationId_fkey" FOREIGN KEY ("valuationId") REFERENCES "Valuation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TagLink_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
