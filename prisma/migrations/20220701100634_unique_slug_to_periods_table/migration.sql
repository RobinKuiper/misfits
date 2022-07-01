/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Period` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Period" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Period_slug_key" ON "Period"("slug");
