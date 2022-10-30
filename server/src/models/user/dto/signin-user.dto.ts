import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password is too weak! (Must contain at least 1: upper-cased letter, number, special character)"
  })
  password: string;
}
