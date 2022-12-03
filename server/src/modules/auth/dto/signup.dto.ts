import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class SignUpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

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
