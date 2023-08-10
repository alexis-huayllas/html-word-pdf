/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { Biblioteca } from './schemas/biblioteca.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BibliotecaService {

  constructor(@InjectModel(Biblioteca.name) private readonly BibliotecaModel: Model<Biblioteca>) {}


  async create(createBibliotecaDto: CreateBibliotecaDto): Promise<Biblioteca> {
    const created= await this.BibliotecaModel.create(createBibliotecaDto);
    return created;
  }

  findAll(): Promise<Biblioteca[]> {
    return this.BibliotecaModel.find().exec();
  }

  findOne(id: string): Promise<Biblioteca> {
    return this.BibliotecaModel.findOne({_id:id}).exec();
  }

  update(id: string, updateBibliotecaDto: UpdateBibliotecaDto): Promise<Biblioteca> {
    return this.BibliotecaModel.findByIdAndUpdate(id,updateBibliotecaDto).exec();
    //return `This action updates a #${id} biblioteca`;
  }

  async remove(id: string) {
    const deleted=await this.BibliotecaModel.findByIdAndRemove({_id:id}).exec();
    return deleted;
  }
}