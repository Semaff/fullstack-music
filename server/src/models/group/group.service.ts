import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private userService: UserService
  ) {}

  async create(createGroupDto: CreateGroupDto, user: User) {
    if (user.group) {
      throw new HttpException(
        "You can't create a group if you already have one",
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.groupsRepository.save({
      ...createGroupDto,
      users: [user]
    });
  }

  async findAll() {
    return await this.groupsRepository.find({
      relations: {
        users: true,
        tracks: true,
        albums: true
      }
    });
  }

  async findOne(id: number) {
    if (!id) return undefined;
    return await this.groupsRepository.findOne({
      where: { id },
      relations: {
        users: true,
        tracks: true,
        albums: true
      }
    });
  }

  async findByName(name: string) {
    if (!name) return undefined;
    return await this.groupsRepository.findOne({
      where: { name },
      relations: {
        users: true,
        tracks: true,
        albums: true
      }
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.groupsRepository.update({ id }, updateGroupDto);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    group.users.forEach((el) => {
      this.userService.update(el.id, { group: null });
    });

    return await this.groupsRepository.delete({ id });
  }
}
