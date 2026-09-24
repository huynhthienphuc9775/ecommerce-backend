import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { CreateInvitationDto, UpdateInvitationDto } from './invitation.dto';
import { S3Service } from '../upload/s3.service';

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
    const name = await this.generateName();

    return this.invitationRepository.save({
      name,
      type: dto.type,
      imageUrl,
    });
  }

  findAll(): Promise<Invitation[]> {
    return this.invitationRepository.find();
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

    return this.invitationRepository.save(invitation);
  }

  async remove(id: number): Promise<void> {
    const invitation = await this.findOne(id);
    await this.s3Service.deleteFile(invitation.imageUrl);
    await this.invitationRepository.delete(id);
  }

  private async generateName(): Promise<string> {
    const count = await this.invitationRepository.count();
    return `Thiệp mời ${String(count + 1).padStart(2, '0')}`;
  }
}
