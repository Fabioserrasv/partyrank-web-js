-- AlterTable
ALTER TABLE `score` ADD COLUMN `createdAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `song` ADD COLUMN `createdAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `songset` ADD COLUMN `createdAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NULL;
