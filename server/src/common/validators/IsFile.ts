import { registerDecorator, ValidationOptions } from "class-validator";

interface IsFileOptions {
  mime: ("image/jpg" | "image/png" | "image/jpeg" | "audio/mpeg" | "audio/mp3")[];
}

export function IsFile(options: IsFileOptions, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: "isFile",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value, validationArguments?) {
          if (value?.mimetype && (options?.mime ?? []).includes(value?.mimetype)) {
            return true;
          }

          return false;
        }
      }
    });
  };
}
