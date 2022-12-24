import * as bcrypt from "bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtUser } from "./interfaces/JwtUser";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  /*
    Sign Up
    =========
  */
  async signup(signUpDto: SignUpDto) {
    const hashPassword = await bcrypt.hash(signUpDto.password, 5);
    const user = await this.usersRepository.save({ ...signUpDto, password: hashPassword });
    return this.generateToken(user);
  }

  /*
    Sign In
    =========
  */
  async signin(signInDto: SignInDto) {
    const user = await this.findByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: "User with this email doesn't exist!" });
    }

    const password = await this.findUserPassword(user.id);
    const isPasswordCorrect = await bcrypt.compare(signInDto.password, password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException({ message: "Wrong password!" });
    }

    return this.generateToken(user);
  }

  /*
    Find By Id
    ===========
  */
  async findById(id: number) {
    return await this.usersRepository.findOne({
      where: { id: id || -1 },
      relations: {
        profile: true
      }
    });
  }

  /*
    Find By Email
    ==============
  */
  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email: email || "" },
      relations: {
        profile: true
      }
    });
  }

  /*
    Find User Password
    ====================
  */
  async findUserPassword(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id || -1 },
      select: {
        password: true
      }
    });
    return user?.password;
  }

  /*
    Update
    =========
  */
  async update(id: number, updateDto: UpdateDto) {
    const user = await this.findById(id);
    return await this.usersRepository.update({ id: user?.id || -1 }, { ...updateDto });
  }

  /*
    Change Password
    ================
  */
  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const password = await this.findUserPassword(id);

    const isPasswordTheSame = await bcrypt.compare(changePasswordDto.password, password);
    if (isPasswordTheSame) {
      throw new HttpException("Password is the same as old!", HttpStatus.BAD_REQUEST);
    }

    const newPassword = await bcrypt.hash(changePasswordDto.password, 5);
    return await this.usersRepository.update({ id }, { password: newPassword });
  }

  /*
    Delete
    =========
  */
  async delete(id: number) {
    return await this.usersRepository.delete({ id: id || -1 });
  }

  /*
    Other
    =========
  */
  async generateToken(user: JwtUser) {
    const payload: JwtUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    return await this.jwtService.signAsync(payload);
  }
}
