/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateActivoDto } from './dto/create-activo.dto';
import { UpdateActivoDto } from './dto/update-activo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Activo } from './schemas/activo.schema';
import { Model } from 'mongoose';

@Injectable()
export class ActivoService {
  constructor(@InjectModel(Activo.name) private readonly ActivoModel: Model<Activo>) {}
  
  async create(createActivoDto: CreateActivoDto) {
    const created= await this.ActivoModel.create(createActivoDto);
    return created;
  }

  findAll(): Promise<Activo[]> {
    return this.ActivoModel.find().exec();
  }

  findOne(id: string): Promise<Activo> {
    return this.ActivoModel.findOne({_id:id}).exec();
  }

  update(id: string, updateActivoDto: UpdateActivoDto): Promise<Activo> {
    return this.ActivoModel.findByIdAndUpdate(id,updateActivoDto).exec();
  }

  async remove(id: string): Promise<Activo> {
    const deleted=await this.ActivoModel.findByIdAndRemove({_id:id}).exec();
    return deleted;
  }
}
