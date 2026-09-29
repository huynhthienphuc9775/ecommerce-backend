import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation.entity';
import { Type } from '../type/type.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation, Type]), UploadModule],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
