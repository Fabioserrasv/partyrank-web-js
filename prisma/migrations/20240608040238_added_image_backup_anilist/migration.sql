-- CreateTable
CREATE TABLE `ImagesAnime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animeName` VARCHAR(191) NULL,
    `anilistLink` VARCHAR(191) NULL,
    `link` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
