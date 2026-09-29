import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './type.entity';
import { CreateTypeDto, UpdateTypeDto } from './type.dto';
import { Invitation } from '../invitation/invitation.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
  ) {}

  create(dto: CreateTypeDto): Promise<Type> {
    return this.typeRepository.save({ name: dto.name });
  }

  findAll(): Promise<Type[]> {
    return this.typeRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typeRepository.findOneBy({ id });
    if (!type) {
      throw new NotFoundException(`Type with id ${id} not found`);
    }
    return type;
  }

  async update(id: number, dto: UpdateTypeDto): Promise<Type> {
    const type = await this.findOne(id);
    type.name = dto.name;
    return this.typeRepository.save(type);
  }

  async remove(id: number): Promise<void> {
    const type = await this.findOne(id);

    const invitationsUsingType = await this.invitationRepository.countBy({
      typeId: id,
    });

    if (invitationsUsingType > 0) {
      throw new ConflictException(
        `Cannot delete type "${type.name}": it is used by ${invitationsUsingType} invitation(s)`,
      );
    }

    await this.typeRepository.delete(id);
  }
}
