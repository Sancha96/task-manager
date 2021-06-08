import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from './entities/stage.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stagesRepository: Repository<Stage>,
  ) {}

  async create(createStageDto: CreateStageDto) {
    const stage = await this.stagesRepository.create(createStageDto);

    return await this.stagesRepository.save(stage);
  }

  async findAll(query) {
    if (query.type) {
      const stages: any = await this.stagesRepository.find({
        relations: ['type'],
      });
      return stages;
    }
  }

  async findOne(id) {
    return await this.stagesRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return `This action updates a #${id} stage`;
  }

  remove(id: number) {
    return `This action removes a #${id} stage`;
  }
}
