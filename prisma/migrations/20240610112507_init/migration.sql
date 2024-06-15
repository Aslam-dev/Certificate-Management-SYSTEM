-- DropIndex
DROP INDEX `CourseEnrollment_courseId_fkey` ON `courseenrollment`;

-- DropIndex
DROP INDEX `CourseEnrollment_studentId_fkey` ON `courseenrollment`;

-- DropIndex
DROP INDEX `Result_courseEnrollmentId_fkey` ON `result`;

-- DropIndex
DROP INDEX `Result_subjectId_fkey` ON `result`;

-- DropIndex
DROP INDEX `Subject_courseId_fkey` ON `subject`;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseEnrollment` ADD CONSTRAINT `CourseEnrollment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseEnrollment` ADD CONSTRAINT `CourseEnrollment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_courseEnrollmentId_fkey` FOREIGN KEY (`courseEnrollmentId`) REFERENCES `CourseEnrollment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
