import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema, SchemaScheme } from '../database-shemas/schema.db';
import { SchemaController } from './schema.controller';
import { ValidatorProvider } from 'src/validator/validator.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schema.name, schema: SchemaScheme }]),
  ],
  providers: [SchemaService, ...ValidatorProvider],
  controllers: [SchemaController],
})
export class SchemaModule {}
