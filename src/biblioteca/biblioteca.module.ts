/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaController } from './biblioteca.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Biblioteca, BibliotecaSchema } from './schemas/biblioteca.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Biblioteca.name,schema:BibliotecaSchema}])],
  controllers: [BibliotecaController],
  providers: [BibliotecaService]
})
export class BibliotecaModule {}
