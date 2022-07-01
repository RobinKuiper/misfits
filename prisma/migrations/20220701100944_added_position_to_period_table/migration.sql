-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Period" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT,
    "slug" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "length" INTEGER NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Period" ("color", "id", "label", "length", "slug") SELECT "color", "id", "label", "length", "slug" FROM "Period";
DROP TABLE "Period";
ALTER TABLE "new_Period" RENAME TO "Period";
CREATE UNIQUE INDEX "Period_slug_key" ON "Period"("slug");
CREATE UNIQUE INDEX "Period_position_key" ON "Period"("position");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
