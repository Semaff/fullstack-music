import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { Profile } from "./entities/profile.entity";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>
  ) {}

  /*
    Create
    ========
  */
  async create(userId: number, createProfileDto: CreateProfileDto) {
    return await this.profilesRepository.save({
      ...createProfileDto,
      user: { id: userId }
    });
  }

  /*
    Find By User Id
    =================
  */
  async findByUserId(userId: number) {
    return await this.profilesRepository.findOne({
      where: {
        user: { id: userId }
      }
    });
  }

  /*
    Find By Id
    ============
  */
  async findById(id: number) {
    return await this.profilesRepository.findOne({
      where: { id }
    });
  }

  /*
    Find By Nickname
    =============
  */
  async findByNickname(nickname: string) {
    return await this.profilesRepository.findOne({
      where: { nickname }
    });
  }

  /*
    Update
    =========
  */
  async update(userId: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findByUserId(userId);
    return await this.profilesRepository.update({ id: profile.id }, { ...updateProfileDto });
  }

  /*
    Delete
    ========
  */
  async delete(userId: number) {
    const profile = await this.findByUserId(userId);
    return await this.profilesRepository.delete({ id: profile?.id || -1 });
  }
}
