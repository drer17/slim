/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Occurrence` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TransactionOccurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionId" TEXT NOT NULL,
    "occurrenceId" TEXT NOT NULL,
    CONSTRAINT "TransactionOccurrence_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransactionOccurrence_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Occurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obligationId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "obligationSatisfying" BOOLEAN NOT NULL DEFAULT false,
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
INSERT INTO "new_Occurrence" ("amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "obligationSatisfying", "startDate", "startTime", "subject") SELECT "amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "obligationSatisfying", "startDate", "startTime", "subject" FROM "Occurrence";
DROP TABLE "Occurrence";
ALTER TABLE "new_Occurrence" RENAME TO "Occurrence";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
