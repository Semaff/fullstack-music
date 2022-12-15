import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { QueryDto } from "./dto/query.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  /*
    Create
    =========
  */
  async create(createCommentDto: CreateCommentDto, userId: number) {
    const { parentId, text, trackId } = createCommentDto;
    return await this.commentRepository.save({
      text,
      user: { id: userId },
      track: { id: trackId },
      parent: { id: parentId }
    });
  }

  /*
    Find By Id
    =============
  */
  async findById(id: number) {
    return await this.commentRepository.findOne({
      where: { id: id || -1 },
      relations: {
        children: true
      }
    });
  }

  /*
    Find By Track
    ================
  */
  async findByTrack(query: QueryDto) {
    const { trackId = -1, page = 1 } = query;
    let { limit = 10 } = query;

    if (limit > 10) limit = 10;

    return await this.commentRepository.find({
      where: { track: { id: trackId }, parent: IsNull() },
      take: limit,
      skip: (page - 1) * limit
    });
  }

  /*
    Find Comment Owner
    ====================
  */
  async findCommentOwner(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        user: {
          profile: true
        }
      }
    });
    return comment.user;
  }

  /*
    Find Comment Parent
    ====================
  */
  async findCommentParent(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        parent: true
      }
    });
    return comment.parent;
  }

  /*
    Update
    ===========
  */
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update({ id }, updateCommentDto);
  }

  /*
    Delete
    ===========
  */
  async delete(id: number) {
    return await this.commentRepository.delete({ id });
  }
}
