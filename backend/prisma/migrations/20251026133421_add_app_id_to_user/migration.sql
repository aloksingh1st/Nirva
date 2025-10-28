-- AlterTable
ALTER TABLE "User" ADD COLUMN     "app_id" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;
