-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_songId_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_userId_fkey`;

-- DropForeignKey
ALTER TABLE `song` DROP FOREIGN KEY `Song_songSetId_fkey`;

-- DropForeignKey
ALTER TABLE `songset` DROP FOREIGN KEY `SongSet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonsongset` DROP FOREIGN KEY `UsersOnSongSet_songSetId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonsongset` DROP FOREIGN KEY `UsersOnSongSet_userId_fkey`;

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

-- RedefineIndex
DROP INDEX `user_username_key` ON `user`;
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
