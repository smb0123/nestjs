import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { BoardRepository } from './board-repository';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    return query.getMany();
  }

  createBoard(CreateBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(CreateBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
