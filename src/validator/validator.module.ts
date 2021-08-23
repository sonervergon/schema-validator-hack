import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaService } from 'src/schema/schema.service';
import { Schema, SchemaScheme } from '../database-shemas/schema.db';
import { ValidatorProvider } from './validator.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schema.name, schema: SchemaScheme }]),
  ],
  providers: [...ValidatorProvider, SchemaService],
  controllers: [],
})
export class ValidatorModule {}
