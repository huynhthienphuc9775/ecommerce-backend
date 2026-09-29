import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService, PaginatedEvents } from './event.service';
import { CreateEventDto, QueryEventDto, UpdateEventDto } from './event.dto';
import { Event } from './event.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  createEvent(
    @Body() dto: CreateEventDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Event> {
    return this.eventService.create(dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllEvents(@Query() query: QueryEventDto): Promise<PaginatedEvents> {
    return this.eventService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  updateEvent(
    @Param('id') id: number,
    @Body() dto: UpdateEventDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Event> {
    return this.eventService.update(id, dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEvent(@Param('id') id: number): Promise<void> {
    return this.eventService.remove(id);
  }
}
