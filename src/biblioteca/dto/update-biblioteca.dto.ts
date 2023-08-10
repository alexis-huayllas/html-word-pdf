/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateBibliotecaDto } from './create-biblioteca.dto';

export class UpdateBibliotecaDto extends PartialType(CreateBibliotecaDto) {}