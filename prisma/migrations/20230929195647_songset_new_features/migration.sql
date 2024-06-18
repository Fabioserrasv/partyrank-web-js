-- AlterTable
ALTER TABLE `songset` ADD COLUMN `maxUsers` INTEGER NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('RECRUITING', 'ON_GOING', 'PROCESSING', 'FINISHED', 'PAUSED') NOT NULL DEFAULT 'ON_GOING',
    ADD COLUMN `type` ENUM('PRIVATE', 'PUBLIC') NOT NULL DEFAULT 'PRIVATE';

-- CreateTable
CREATE TABLE `usersonsongset` (
    `songSetId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`songSetId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usersonsongset` ADD CONSTRAINT `UsersOnSongSet_songSetId_fkey` FOREIGN KEY (`songSetId`) REFERENCES `songset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonsongset` ADD CONSTRAINT `UsersOnSongSet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
