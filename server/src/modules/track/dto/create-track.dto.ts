// We can't use class-validator because multer will create the file before we checking..
export class CreateTrackDto {
  name: string;
}
