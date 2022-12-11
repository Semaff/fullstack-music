import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Track } from "./entities/track.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>
  ) {}

  /*
    Create - we must specify guard here, because interceptor only populates body after
    =================
  */
  async create(createTrackDto: CreateTrackDto, file: Express.Multer.File, userId: number) {
    const track = await this.findByName(createTrackDto.name);
    if (track) {
      fs.unlinkSync(
        path.resolve(__dirname, "..", "..", "..", "static", file.destination + "\\" + file.filename)
      );

      throw new HttpException("Track with that name already exists!", HttpStatus.BAD_REQUEST);
    }

    return await this.tracksRepository.save({
      ...createTrackDto,
      file: file.destination + "\\" + file.filename,
      user: { id: userId }
    });
  }

  /*
    Find By Id
    ===============
  */
  async findById(id: number) {
    return await this.tracksRepository.findOne({
      where: { id: id || -1 }
    });
  }

  /*
    Find By Name
    =================
  */
  async findByName(name: string) {
    return await this.tracksRepository.findOne({
      where: { name: name || "" }
    });
  }

  /*
    Find By User Id
    ===============
  */
  async findByUserId(userId: number) {
    return await this.tracksRepository.find({
      where: { user: { id: userId || -1 } }
    });
  }

  /*
    Find Track Owner
    ===============
  */
  async findTrackOwner(id: number) {
    const track = await this.tracksRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    });
    return track.user;
  }

  /*
    Update
    =========
  */
  async update(id: number, updateTrackDto: UpdateTrackDto) {
    return await this.tracksRepository.update({ id }, { ...updateTrackDto });
  }

  /*
    Delete
    ==========
  */
  async delete(id: number) {
    return await this.tracksRepository.delete({ id });
  }
}