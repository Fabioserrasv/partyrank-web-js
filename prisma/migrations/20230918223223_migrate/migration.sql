-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `animeList` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `admin` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SongSet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Song` (
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
CREATE TABLE `Score` (
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

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_songSetId_fkey` FOREIGN KEY (`songSetId`) REFERENCES `SongSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Song`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
