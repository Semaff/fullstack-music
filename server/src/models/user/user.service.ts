import * as bcrypt from "bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInUserDto } from "./dto/signin-user.dto";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { User } from "./entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtUser } from "./interfaces/JwtUser";
import { TrackService } from "../track/track.service";
import { AlbumService } from "../album/album.service";
import { PlaylistService } from "../playlist/playlist.service";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private playlistService: PlaylistService,
    private profileService: ProfileService
  ) {}

  async signup(signUpUserDto: SignUpUserDto) {
    const hashPassword = await bcrypt.hash(signUpUserDto.password, 5);
    const user = await this.usersRepository.save({ ...signUpUserDto, password: hashPassword });
    return this.generateToken(user);
  }

  async signin(signInUserDto: SignInUserDto) {
    const user = await this.usersRepository.findOne({ where: { email: signInUserDto.email } });
    const arePasswordsEquals = await bcrypt.compare(signInUserDto.password, user.password);
    if (user && arePasswordsEquals) {
      return this.generateToken(user);
    }

    throw new UnauthorizedException({ message: "Wrong email or password!" });
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        group: true,
        profile: true,
        tracks: true,
        albums: true,
        playlists: true
      }
    });
  }

  async findOne(id: number) {
    if (!id) return undefined;
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        group: true,
        profile: true,
        tracks: true,
        albums: true,
        playlists: true
      }
    });
  }

  async findByEmail(email: string) {
    if (!email) return undefined;
    return await this.usersRepository.findOne({
      where: { email },
      relations: {
        group: true,
        profile: true,
        tracks: true,
        albums: true,
        playlists: true
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      const arePasswordsEquals = await bcrypt.compare(updateUserDto.password, user.password);
      if (arePasswordsEquals) {
        throw new HttpException("Password is the same as old!", HttpStatus.BAD_REQUEST);
      }

      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 5);
    }

    return await this.usersRepository.update({ id: user.id }, { ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    user.albums?.forEach(async (el) => {
      await this.albumService.remove(el.id);
    });
    user.playlists?.forEach(async (el) => {
      await this.playlistService.remove(el.id);
    });
    user.tracks?.forEach(async (el) => {
      await this.trackService.remove(el.id);
    });

    await this.profileService.remove(user.profile?.id);
    return await this.usersRepository.delete({ id: user.id });
  }

  private generateToken(user: User) {
    const payload: JwtUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isMusician: user.isMusician
    };

    return {
      token: this.jwtService.sign(payload)
    };
  }
}
