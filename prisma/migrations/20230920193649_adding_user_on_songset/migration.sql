/*
  Warnings:

  - Added the required column `userId` to the `songset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `songset` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `songset` ADD CONSTRAINT `SongSet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
