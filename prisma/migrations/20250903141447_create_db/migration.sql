-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `animeList` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `admin` BOOLEAN NOT NULL,
    `acceptingInvite` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `anilistLink` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('RECRUITING', 'ON_GOING', 'PROCESSING', 'FINISHED', 'PAUSED') NOT NULL DEFAULT 'ON_GOING',
    `type` ENUM('PRIVATE', 'PUBLIC') NOT NULL DEFAULT 'PRIVATE',
    `scoreSystem` ENUM('RANKING', 'SCORING', 'SCORING_AVERAGE') NOT NULL DEFAULT 'SCORING_AVERAGE',
    `maxUsers` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersonsongset` (
    `songSetId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`songSetId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `song` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songSetId` INTEGER NOT NULL,
    `anime` VARCHAR(191) NOT NULL,
    `artist` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `type` ENUM('OPENING', 'ENDING', 'INSERT_SONG') NOT NULL DEFAULT 'OPENING',
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `songId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `videoTimeStamp` INTEGER NOT NULL,
    `valid` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagesanime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animeName` VARCHAR(191) NULL,
    `anilistLink` VARCHAR(191) NULL,
    `link` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songservice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `songservice_service_key`(`service`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `songset` ADD CONSTRAINT `songset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonsongset` ADD CONSTRAINT `usersonsongset_songSetId_fkey` FOREIGN KEY (`songSetId`) REFERENCES `songset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonsongset` ADD CONSTRAINT `usersonsongset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `song` ADD CONSTRAINT `song_songSetId_fkey` FOREIGN KEY (`songSetId`) REFERENCES `songset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `score` ADD CONSTRAINT `score_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `song`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `score` ADD CONSTRAINT `score_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
