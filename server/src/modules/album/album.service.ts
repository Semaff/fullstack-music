import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Track } from "../track/entities/track.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { Album } from "./entities/album.entity";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>
  ) {}

  /*
    Create
    ========
  */
  async create(createAlbumDto: CreateAlbumDto, userId: number) {
    return await this.albumRepository.save({
      ...createAlbumDto,
      user: { id: userId }
    });
  }

  /*
    Add Tracks
    ===========
  */
  async addTracks(id: number, tracks: Track[]) {
    const album = await this.findById(id);
    album.tracks.push(...tracks);
    return await this.albumRepository.save(album);
  }

  /*
    Remove Tracks
    =================
  */
  async removeTracks(id: number, tracks: Track[]) {
    const album = await this.findById(id);
    album.tracks = album.tracks.filter((track) => !tracks.find((el) => el.id === track.id));
    return await this.albumRepository.save(album);
  }

  /*
    Find By Id
    ========
  */
  async findById(id: number) {
    return await this.albumRepository.findOne({
      where: {
        id: id || -1
      },
      relations: {
        tracks: true
      }
    });
  }

  /*
    Find By Name
    ================
  */
  async findByName(name: string) {
    return await this.albumRepository.findOne({
      where: {
        name: name || ""
      },
      relations: {
        tracks: true
      }
    });
  }

  /*
    Find Album Owner
    ================
  */
  async findAlbumOwner(albumId: number) {
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId || -1
      },
      relations: {
        user: true
      }
    });
    return album.user;
  }

  /*
    Update
    =========
  */
  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update({ id: id || -1 }, updateAlbumDto);
  }

  /*
    Delete
    ========
  */
  async delete(id: number) {
    return await this.albumRepository.delete({ id: id || -1 });
  }
}
