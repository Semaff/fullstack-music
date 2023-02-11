import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { generateRandomName } from "../../common/utils/generateRandomName";
import * as path from "path";

export function ServeFile(fileName: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fileName, {
        storage: diskStorage({
          destination: path.resolve(__dirname, "..", "..", "..", "static"),
          filename: (req, file, cb) => {
            const randomName = generateRandomName();
            return cb(null, `${randomName}${path.extname(file.originalname)}`);
          }
        })
      })
    )
  );
}
