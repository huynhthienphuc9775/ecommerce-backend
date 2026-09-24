import { IsEnum } from 'class-validator';
import { InvitationType } from './invitation.entity';

export class CreateInvitationDto {
  @IsEnum(InvitationType)
  type: InvitationType;
}
