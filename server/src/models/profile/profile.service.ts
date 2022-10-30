import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { Profile } from "./entities/profile.entity";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>
  ) {}

  async create(createProfileDto: CreateProfileDto, user: User) {
    if (user.profile) {
      throw new HttpException(
        "You can't create a profile if you already have one",
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.profilesRepository.save({
      ...createProfileDto,
      user
    });
  }

  async findAll() {
    return await this.profilesRepository.find();
  }

  async findOne(id: number) {
    if (!id) return undefined;
    return await this.profilesRepository.findOne({ where: { id } });
  }

  async findByName(nickname: string) {
    if (!nickname) return undefined;
    return await this.profilesRepository.findOne({ where: { nickname } });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.profilesRepository.update({ id }, updateProfileDto);
  }

  async remove(id: number) {
    return await this.profilesRepository.delete({ id });
  }
}
