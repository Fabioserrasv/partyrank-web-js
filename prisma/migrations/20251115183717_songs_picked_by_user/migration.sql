-- AlterTable
ALTER TABLE `song` ADD COLUMN `pickedById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `song` ADD CONSTRAINT `song_pickedById_fkey` FOREIGN KEY (`pickedById`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
