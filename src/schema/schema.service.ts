import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import inc from 'semver/functions/inc';
import { Schema, SchemaDocument } from '../database-shemas/schema.db';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class SchemaService {
  constructor(
    @InjectModel(Schema.name) private schemaModel: Model<SchemaDocument>,
  ) {}

  createSchema = async (
    id: string,
    jsonSchema: Record<string, any>,
    version = { major: 0, minor: 0, patch: 0 },
  ) => {
    const schema = new this.schemaModel({
      id,
      schema: jsonSchema,
      version,
    });
    return schema.save();
  };

  getVersion = (version: { major: number; minor: number; patch: number }) =>
    `${version.major}.${version.minor}.${version.patch}`;

  generateVersionObject = (
    version: string,
  ): { major: number; minor: number; patch: number } => {
    const [major, minor, patch] = version.split('.').map((v) => Number(v));
    return {
      major,
      minor,
      patch,
    };
  };

  updateSchema = async (
    id: string,
    {
      version: release,
      schema,
    }: {
      version: 'patch' | 'minor' | 'major';
      schema: Record<string, any>;
    },
  ) => {
    const doc = await this.getSchema(id);

    if (!doc) throw new HttpException('Schema not found', HttpStatus.NOT_FOUND);
    const currentVersion = this.getVersion(doc.toJSON().version);
    const newVersion = inc(currentVersion, release);
    const versionObject = this.generateVersionObject(newVersion);
    return this.createSchema(id, schema, versionObject);
  };

  getSchema = async (
    id: string,
    version?: { major: number; minor: number; patch: number },
  ) => {
    const constraints = version
      ? {
          'version.major': version.major,
          'version.minor': version.minor,
          'version.patch': version.patch,
        }
      : {};
    const data = await this.schemaModel.find({ id, ...constraints }).exec();

    return data ? data[0] : null;
  };
}
