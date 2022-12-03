import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import { UpdateDto } from "./dto/update.dto";
import { SetTokenInterceptor } from "./interceptors/set-token";
import { CleanTokenInterceptor } from "./interceptors/clean-token";
import { EmailGuard } from "./guards/email.guard";
import { AuthGuard } from "./guards/auth.guard";

@Controller("user")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
    Sign Up
    =========
  */
  @Post("/signup")
  @UseGuards(EmailGuard)
  @UseInterceptors(SetTokenInterceptor)
  async signup(
    @Body()
    signUpDto: SignUpDto
  ) {
    return await this.authService.signup(signUpDto);
  }

  /*
    Sign In
    =========
  */
  @Post("/signin")
  @UseInterceptors(SetTokenInterceptor)
  async signin(
    @Body()
    signInDto: SignInDto
  ) {
    return await this.authService.signin(signInDto);
  }

  /*
    Refresh Token
    =================
  */
  @Get("/refresh")
  @UseGuards(AuthGuard)
  @UseInterceptors(SetTokenInterceptor)
  async refreshToken(@Req() request: Request) {
    return this.authService.generateToken(request.user);
  }

  /*
    Logout
    =========
  */
  @Get("/logout")
  @UseGuards(AuthGuard)
  @UseInterceptors(CleanTokenInterceptor)
  logout() {
    return "Logged out!";
  }

  /*
    Find By Id
    ============
  */
  @Get(":id")
  @UseGuards(AuthGuard)
  findById(@Param("id") id: string) {
    return this.authService.findById(+id);
  }

  /*
    Find Me
    =================
  */
  @Get("/")
  @UseGuards(AuthGuard)
  async findMe(@Req() request: Request) {
    return this.authService.findById(request.user.id);
  }

  /*
    Update
    =========
  */
  @Patch()
  @UseGuards(AuthGuard, EmailGuard)
  update(
    @Req()
    request: Request,

    @Body()
    updateDto: UpdateDto
  ) {
    return this.authService.update(request.user.id, updateDto);
  }

  /*
    Change Password
    =================
  */
  @Patch("/change-password")
  @UseGuards(AuthGuard)
  changePassword(
    @Req()
    request: Request,

    @Body()
    changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(request.user.id, changePasswordDto);
  }

  /*
    Delete
    =========
  */
  @Delete()
  @UseGuards(AuthGuard)
  @UseInterceptors(CleanTokenInterceptor)
  delete(@Req() request: Request) {
    return this.authService.delete(request.user.id);
  }
}
