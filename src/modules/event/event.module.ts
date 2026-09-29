import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { Category } from '../category/category.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Category]), UploadModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
