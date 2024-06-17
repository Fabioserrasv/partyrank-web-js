/*
  Warnings:

  - Added the required column `userId` to the `SongSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SongSet` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SongSet` ADD CONSTRAINT `SongSet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
