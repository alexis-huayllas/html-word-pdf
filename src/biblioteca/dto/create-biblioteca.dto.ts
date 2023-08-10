/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateBibliotecaDto {
    @ApiProperty({ type:'string', description: 'cabecera de pagina', required: false })
    readonly header: string;
    @ApiProperty({ type:'string', description: 'pie de pagina', required: false })
    readonly footer: string;
}