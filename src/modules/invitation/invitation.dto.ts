import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { InvitationType } from './invitation.entity';

const toBoolean = ({ value }: { value: unknown }): unknown => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

export class CreateInvitationDto {
  @IsEnum(InvitationType)
  type: InvitationType;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  active?: boolean;
}

export class UpdateInvitationDto {
  @IsOptional()
  @IsEnum(InvitationType)
  type?: InvitationType;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  active?: boolean;
}
