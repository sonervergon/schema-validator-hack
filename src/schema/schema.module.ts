import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema, SchemaScheme } from '../database-shemas/schema.db';
import { SchemaController } from './schema.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schema.name, schema: SchemaScheme }]),
  ],
  providers: [SchemaService],
  controllers: [SchemaController],
})
export class SchemaModule {}
