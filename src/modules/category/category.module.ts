import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { Event } from '../event/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Event])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
