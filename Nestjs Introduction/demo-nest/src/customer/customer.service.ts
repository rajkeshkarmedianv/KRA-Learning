/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
   constructor(
    @InjectRepository(Customer)
    private readonly custRepo: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const user = this.custRepo.create(createCustomerDto);
    console.log(user);
    return await this.custRepo.save(user);
  }

  async findAll(): Promise<Customer[]> {
    return await this.custRepo.find();
  }

  async findOne(id: number): Promise<Customer> {
    const user = await this.custRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const user = await this.custRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException('User not found');
    }
     await this.custRepo.update(id, updateCustomerDto);
     return await this.custRepo.findOneBy({id});
  }

  async remove(id: number) {
    const user = await this.custRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException('User not found');
    }
    return this.custRepo.delete(id);
  }
}
