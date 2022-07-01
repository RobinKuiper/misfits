-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Period" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT,
    "length" INTEGER NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Period" ("color", "id", "label", "length") SELECT "color", "id", "label", "length" FROM "Period";
DROP TABLE "Period";
ALTER TABLE "new_Period" RENAME TO "Period";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
