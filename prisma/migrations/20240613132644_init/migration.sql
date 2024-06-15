/*
  Warnings:

  - You are about to drop the column `certificateNumber` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `nic` on the `student` table. All the data in the column will be lost.
  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courseenrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `certificateId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduationYear` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `results` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentCode` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Student_nic_key` ON `student`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `certificateNumber`,
    DROP COLUMN `nic`,
    ADD COLUMN `certificateId` VARCHAR(191) NOT NULL,
    ADD COLUMN `course` VARCHAR(191) NOT NULL,
    ADD COLUMN `graduationYear` INTEGER NOT NULL,
    ADD COLUMN `nationality` VARCHAR(191) NOT NULL,
    ADD COLUMN `results` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentCode` VARCHAR(191) NOT NULL,
    MODIFY `photo` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `course`;

-- DropTable
DROP TABLE `courseenrollment`;

-- DropTable
DROP TABLE `result`;

-- DropTable
DROP TABLE `subject`;
