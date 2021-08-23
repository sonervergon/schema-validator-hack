import { Inject, Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import { Model } from 'mongoose';
import { Schema, SchemaDocument } from '../database-shemas/schema.db';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ValidatorService {
  constructor(
    @Inject('JSON_SCHEMA_VALIDATOR') private validator: Ajv,
    @InjectModel(Schema.name)
    private schemaModel: Model<SchemaDocument>,
  ) {}

  validate = (schema: Record<string, any>, json: Record<string, any>) => {
    const validate =
      this.validator.getSchema(schema['$id' || '']) ||
      this.validator.compile(schema);
    return validate(json);
  };
}
