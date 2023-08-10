/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type ActivoDocument = HydratedDocument<Activo>;

@Schema()
export class Activo{
    @Prop()
    header:string

    @Prop()
    footer:string

    /*@Prop()
    izquierda:string

    @Prop()
    derecha:string*/

    /*@Prop()
    @ApiProperty({ type:'string', description: 'archivo word base64', required: false })
    word: string;*/
}

export const ActivoSchema = SchemaFactory.createForClass(Activo);