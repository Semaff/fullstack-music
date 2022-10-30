import {
  ParseFilePipe,
  UploadedFile,
  FileTypeValidator,
  MaxFileSizeValidator
} from "@nestjs/common";

export const UploadedMusicFile = () => {
  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({
          fileType: /(wav|mp3|mpeg)/
        }),
        new MaxFileSizeValidator({
          maxSize: 100000000
        })
      ]
    })
  );
};
