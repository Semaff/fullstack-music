import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Playlist } from "./entities/playlist.entity";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, user: User) {
    return await this.playlistRepository.save({ ...createPlaylistDto, user });
  }

  async findAll() {
    return await this.playlistRepository.find();
  }

  async findOne(id: number) {
    if (!id) return undefined;
    return await this.playlistRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    if (!name) return undefined;
    return await this.playlistRepository.findOne({ where: { name } });
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update({ id }, updatePlaylistDto);
  }

  async remove(id: number) {
    return await this.playlistRepository.delete({ id });
  }
}
