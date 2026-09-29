import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto, UpdateTypeDto } from './type.dto';
import { Type } from './type.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createType(@Body() dto: CreateTypeDto): Promise<Type> {
    return this.typeService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTypes(): Promise<Type[]> {
    return this.typeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getType(@Param('id') id: number): Promise<Type> {
    return this.typeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateType(
    @Param('id') id: number,
    @Body() dto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typeService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteType(@Param('id') id: number): Promise<void> {
    return this.typeService.remove(id);
  }
}
