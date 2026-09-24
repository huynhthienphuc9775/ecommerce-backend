import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './invitation.dto';
import { Invitation } from './invitation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  createInvitation(
    @Body() dto: CreateInvitationDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Invitation> {
    return this.invitationService.create(dto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllInvitations(): Promise<Invitation[]> {
    return this.invitationService.findAll();
  }
}
