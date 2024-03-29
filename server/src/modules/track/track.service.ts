import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
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
    const staticPath = path.resolve(__dirname, "..", "..", "..", "static");
    const trackPath = path.resolve(staticPath, file.destination + "\\" + file.filename);
    if (createTrackDto.name?.length < 3) {
      fs.unlinkSync(trackPath);
      throw new HttpException("Name should be 3 length long!", HttpStatus.BAD_REQUEST);
    }

    if (track) {
      fs.unlinkSync(trackPath);
      throw new HttpException("Track with that name already exists!", HttpStatus.BAD_REQUEST);
    }

    const fileDestination = `http://localhost:5000/` + file.filename;
    return await this.tracksRepository.save({
      ...createTrackDto,
      file: fileDestination,
      user: { id: userId }
    });
  }

  /*
    Find By Id
    ===============
  */
  async findById(id: number) {
    return await this.tracksRepository.findOne({
      where: { id: id || -1 },
      relations: {
        user: {
          profile: true
        },
        comments: {
          user: true
        }
      }
    });
  }

  /*
    Find By Name
    =================
  */
  async findByName(name: string) {
    return await this.tracksRepository.findOne({
      where: { name: name || "" },
      relations: {
        user: {
          profile: true
        }
      }
    });
  }

  /*
    Find By User Id
    ===============
  */
  async findByUserId(userId: number) {
    return await this.tracksRepository.find({
      where: { user: { id: userId || -1 } },
      relations: {
        user: {
          profile: true
        }
      }
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
    return track?.user;
  }

  /*
    Search
    ===============
  */
  async search(search: string) {
    return await this.tracksRepository.find({
      where: {
        name: ILike(search ? `${search}%` : "%")
      },
      relations: {
        user: {
          profile: true
        }
      }
    });
  }

  /*
    Update
    =========
  */
  async update(id: number, updateTrackDto: UpdateTrackDto) {
    if (updateTrackDto.name?.length < 3) {
      throw new HttpException("Name should be 3 length long!", HttpStatus.BAD_REQUEST);
    }

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
