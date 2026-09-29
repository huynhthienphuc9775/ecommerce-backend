import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Event } from '../event/event.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save({ name: dto.name });
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    category.name = dto.name;
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    const eventsUsingCategory = await this.eventRepository.countBy({
      categoryId: id,
    });

    if (eventsUsingCategory > 0) {
      throw new ConflictException(
        `Cannot delete category "${category.name}": it is used by ${eventsUsingCategory} event(s)`,
      );
    }

    await this.categoryRepository.delete(id);
  }
}
