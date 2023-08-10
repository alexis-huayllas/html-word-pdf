/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type bibliotecaDocument = HydratedDocument<Biblioteca>;

@Schema()
export class Biblioteca{
    @Prop()
    header:string

    @Prop()
    footer:string

    /*@Prop()
    @ApiProperty({ type:'string', description: 'archivo word base64', required: false })
    word: string;*/
}

export const BibliotecaSchema = SchemaFactory.createForClass(Biblioteca);