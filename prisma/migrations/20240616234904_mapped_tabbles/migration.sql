-- DropForeignKey
ALTER TABLE `Score` DROP FOREIGN KEY `Score_songId_fkey`;

-- DropForeignKey
ALTER TABLE `Score` DROP FOREIGN KEY `Score_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Song` DROP FOREIGN KEY `Song_songSetId_fkey`;

-- DropForeignKey
ALTER TABLE `SongSet` DROP FOREIGN KEY `SongSet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonsongset` DROP FOREIGN KEY `UsersOnSongSet_songSetId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonsongset` DROP FOREIGN KEY `UsersOnSongSet_userId_fkey`;

-- AddForeignKey
ALTER TABLE `SongSet` ADD CONSTRAINT `songset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonsongset` ADD CONSTRAINT `usersonsongset_songSetId_fkey` FOREIGN KEY (`songSetId`) REFERENCES `SongSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonsongset` ADD CONSTRAINT `usersonsongset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `song_songSetId_fkey` FOREIGN KEY (`songSetId`) REFERENCES `SongSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `score_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Song`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `score_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
DROP INDEX `user_username_key` ON `User`;
CREATE UNIQUE INDEX `user_username_key` ON `User`(`username`);
