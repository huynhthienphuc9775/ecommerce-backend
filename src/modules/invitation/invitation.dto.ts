import { IsEnum, IsOptional } from 'class-validator';
import { InvitationType } from './invitation.entity';

export class CreateInvitationDto {
  @IsEnum(InvitationType)
  type: InvitationType;
}

export class UpdateInvitationDto {
  @IsOptional()
  @IsEnum(InvitationType)
  type?: InvitationType;
}
