/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { ActivoModule } from './activo/activo.module';

@Module({
  imports: [
    MongooseModule.forRoot(
    'mongodb://fundation:freefundation221@10.10.214.219:27017/',
      {
        dbName:'htm-pdf'
      }),
  BibliotecaModule, 
  ActivoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

