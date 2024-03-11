import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const result = new this.productModel(createProductDto);
    return result.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const result = this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
    return result;
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return { message: 'Delete Successful' };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
