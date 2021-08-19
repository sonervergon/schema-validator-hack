import { Prop, raw, Schema as S, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchemaDocument = Schema & Document;

@S()
export class Schema {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, type: raw({}) })
  schema: Record<string, any>;

  @Prop(
    raw({
      major: { type: Number },
      minor: { type: Number },
      patch: { type: Number },
    }),
  )
  version: {
    major: number;
    minor: number;
    patch: number;
  };
}

export const SchemaScheme = SchemaFactory.createForClass(Schema);
