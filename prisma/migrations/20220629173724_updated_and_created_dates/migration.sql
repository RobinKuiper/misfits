-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Piece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Piece_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Piece" ("categoryId", "description", "featured", "id", "image", "name", "published", "slug") SELECT "categoryId", "description", "featured", "id", "image", "name", "published", "slug" FROM "Piece";
DROP TABLE "Piece";
ALTER TABLE "new_Piece" RENAME TO "Piece";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
