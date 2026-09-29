import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { Type } from './type.entity';
import { Invitation } from '../invitation/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Type, Invitation])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
