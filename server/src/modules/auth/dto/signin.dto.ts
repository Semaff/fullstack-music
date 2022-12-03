import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Wrong password (even by validation!)"
  })
  password: string;
}
