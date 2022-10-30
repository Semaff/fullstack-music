import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { Album } from "./entities/album.entity";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>
  ) {}

  async create(createAlbumDto: CreateAlbumDto, user: User) {
    return await this.albumRepository.save({
      ...createAlbumDto,
      group: createAlbumDto.useGroup ? user.group : null,
      user: createAlbumDto.useGroup ? null : user
    });
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    if (!id) return undefined;
    return await this.albumRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    if (!name) return undefined;
    return await this.albumRepository.findOne({ where: { name } });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update({ id }, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumRepository.delete({ id });
  }
}
