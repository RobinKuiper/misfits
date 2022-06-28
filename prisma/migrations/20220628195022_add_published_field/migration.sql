-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Item" ("description", "id", "image", "name") SELECT "description", "id", "image", "name" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Note" ("description", "id", "image", "name") SELECT "description", "id", "image", "name" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Npc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Npc" ("description", "id", "image", "name") SELECT "description", "id", "image", "name" FROM "Npc";
DROP TABLE "Npc";
ALTER TABLE "new_Npc" RENAME TO "Npc";
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Character" ("description", "id", "image", "name") SELECT "description", "id", "image", "name" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Location" ("description", "id", "image", "name") SELECT "description", "id", "image", "name" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
