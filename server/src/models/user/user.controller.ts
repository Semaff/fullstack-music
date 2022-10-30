import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/user-jwt-auth.guard";
import { SignInUserDto } from "./dto/signin-user.dto";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { UserOccupiedGuard } from "./guards/user-occupied.guard";
import { Request } from "express";
import { UserExistsGuard } from "./guards/user-exists.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  @UseGuards(UserOccupiedGuard)
  signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.userService.signup(signUpUserDto);
  }

  @Post("/signin")
  @UseGuards(UserExistsGuard)
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.userService.signin(signInUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, UserOccupiedGuard)
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(request.user?.id, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Req() request: Request) {
    return this.userService.remove(request.user?.id);
  }
}
