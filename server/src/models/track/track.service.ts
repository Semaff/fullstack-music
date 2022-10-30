import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Track } from "./entities/track.entity";
import { User } from "../user/entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>
  ) {}

  async create(createTrackDto: CreateTrackDto, file: Express.Multer.File, user: User) {
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
      group: createTrackDto.asGroup ? user.group : null,
      user: createTrackDto.asGroup ? null : user
    });
  }

  async findAll() {
    return await this.tracksRepository.find({
      relations: {
        group: true,
        user: true
      }
    });
  }

  async findOne(id: number) {
    if (!id) return undefined;
    return await this.tracksRepository.findOne({
      where: { id },
      relations: {
        group: true,
        user: true
      }
    });
  }

  async findByName(name: string) {
    if (!name) return undefined;
    return await this.tracksRepository.findOne({
      where: { name },
      relations: {
        group: true,
        user: true
      }
    });
  }

  async update(id: number, updateTrackDto: UpdateTrackDto) {
    const track = await this.findByName(updateTrackDto.name);
    if (track) {
      throw new HttpException("Track with that name already exists!", HttpStatus.BAD_REQUEST);
    }

    return await this.tracksRepository.update({ id }, updateTrackDto);
  }

  async remove(id: number) {
    return await this.tracksRepository.delete({ id });
  }
}
