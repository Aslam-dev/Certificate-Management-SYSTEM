-- CreateTable
CREATE TABLE `Student` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `studentCode` VARCHAR(191) NOT NULL,
    `certificateId` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `results` VARCHAR(191) NOT NULL,
    `graduationYear` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
