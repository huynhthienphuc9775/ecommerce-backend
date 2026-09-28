import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(dto: CreateProductDto): Promise<Product> {
    return this.productRepository.save({
      name: dto.name,
      price: dto.price,
      description: dto.description ?? null,
      active: dto.active ?? true,
    });
  }
}
