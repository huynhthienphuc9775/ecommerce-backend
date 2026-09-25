import { IsBoolean, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
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

export class QueryInvitationDto {
  @IsOptional()
  @IsEnum(InvitationType)
  type?: InvitationType;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}
