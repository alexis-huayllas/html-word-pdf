/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ActivoService } from './activo.service';
import { ActivoController } from './activo.controller';
import { Activo, ActivoSchema } from './schemas/activo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:Activo.name,schema:ActivoSchema}])],
  controllers: [ActivoController],
  providers: [ActivoService]
})
export class ActivoModule {}