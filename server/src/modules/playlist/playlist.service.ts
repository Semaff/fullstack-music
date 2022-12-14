import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Track } from "../track/entities/track.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Playlist } from "./entities/playlist.entity";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>
  ) {}

  /*
    Create
    ==========
  */
  async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    return await this.playlistRepository.save({
      ...createPlaylistDto,
      user: { id: userId }
    });
  }

  /*
    Add Tracks
    ===========
  */
  async addTracks(id: number, tracks: Track[]) {
    const playlist = await this.findById(id);
    playlist.tracks = [...playlist.tracks, ...tracks];
    return await this.playlistRepository.save(playlist);
  }

  /*
    Remove Tracks
    =================
  */
  async removeTracks(id: number, tracks: Track[]) {
    const playlist = await this.findById(id);
    playlist.tracks = playlist.tracks.filter((track) => !tracks.find((el) => el.id === track.id));
    return await this.playlistRepository.save(playlist);
  }

  /*
    Find By Id
    =============
  */
  async findById(id: number) {
    return await this.playlistRepository.findOne({
      where: { id: id || -1 },
      relations: { tracks: true }
    });
  }

  /*
    Find By Name
    ==============
  */
  async findByName(name: string) {
    return await this.playlistRepository.findOne({
      where: { name: name || "" },
      relations: { tracks: true }
    });
  }

  /*
    Find Playlist Owner
    =====================
  */
  async findPlaylistOwner(playlistId: number) {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: playlistId || -1
      },
      relations: {
        user: true
      }
    });
    return playlist.user;
  }

  /*
    Update
    =============
  */
  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update({ id }, updatePlaylistDto);
  }

  /*
    Delete
    =============
  */
  async delete(id: number) {
    return await this.playlistRepository.delete({ id });
  }
}
