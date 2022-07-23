/*
  Warnings:

  - Added the required column `teacherDisciplineId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teacherDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
