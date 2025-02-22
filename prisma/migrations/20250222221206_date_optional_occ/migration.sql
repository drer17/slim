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
    "endDate" DATETIME,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" DATETIME,
    CONSTRAINT "Occurrence_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "Obligation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Occurrence" ("amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "satisfied", "startDate", "startTime", "subject") SELECT "amount", "archivedAt", "color", "createdAt", "description", "endDate", "endTime", "id", "location", "obligationId", "satisfied", "startDate", "startTime", "subject" FROM "Occurrence";
DROP TABLE "Occurrence";
ALTER TABLE "new_Occurrence" RENAME TO "Occurrence";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
