import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import {
  CreateInvitationDto,
  QueryInvitationDto,
  UpdateInvitationDto,
} from './invitation.dto';
import { S3Service } from '../upload/s3.service';

export interface PaginatedInvitations {
  data: Invitation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    dto: CreateInvitationDto,
    image: Express.Multer.File,
  ): Promise<Invitation> {
    if (!image) {
      throw new BadRequestException('Image is required');
    }

    const imageUrl = await this.s3Service.uploadFile(image, 'invitations');

    const invitation = await this.invitationRepository.save({
      name: '',
      type: dto.type,
      imageUrl,
      active: dto.active ?? true,
    });

    invitation.name = `Thiệp mời ${String(invitation.id).padStart(2, '0')}`;
    return this.invitationRepository.save(invitation);
  }

  async findAll(query: QueryInvitationDto): Promise<PaginatedInvitations> {
    const { type, active, page, limit } = query;

    const [data, total] = await this.invitationRepository.findAndCount({
      where: {
        ...(type && { type }),
        ...(active !== undefined && { active }),
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOneBy({ id });
    if (!invitation) {
      throw new NotFoundException(`Invitation with id ${id} not found`);
    }
    return invitation;
  }

  async update(
    id: number,
    dto: UpdateInvitationDto,
    image?: Express.Multer.File,
  ): Promise<Invitation> {
    const invitation = await this.findOne(id);

    if (image) {
      await this.s3Service.deleteFile(invitation.imageUrl);
      invitation.imageUrl = await this.s3Service.uploadFile(
        image,
        'invitations',
      );
    }

    if (dto.type) {
      invitation.type = dto.type;
    }

    if (dto.active !== undefined) {
      invitation.active = dto.active;
    }

    return this.invitationRepository.save(invitation);
  }

  async remove(id: number): Promise<void> {
    const invitation = await this.findOne(id);
    await this.s3Service.deleteFile(invitation.imageUrl);
    await this.invitationRepository.delete(id);
  }
}
