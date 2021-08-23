import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { SchemaDocument } from 'src/database-shemas/schema.db';
import { CreateSchemaDto, GetSchemaDto, UpdateSchemaDto } from './schema.dto';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
  constructor(private schemaService: SchemaService) {}

  @Post('/')
  async create(@Body() body: CreateSchemaDto) {
    const exists = await this.schemaService.getSchema(body.id);
    if (exists)
      throw new HttpException('Schema already exists', HttpStatus.BAD_REQUEST);

    const doc = await this.schemaService.createSchema(body.id, body.schema);
    return this.schemaResponse(doc);
  }

  @Get(':id')
  async getSchema(@Param('id') id: string, @Body() { version }: GetSchemaDto) {
    const data = await this.schemaService.getSchema(
      id,
      version ? this.schemaService.generateVersionObject(version) : null,
    );
    return data
      ? this.schemaResponse(data)
      : new HttpException('Schema could not be found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async updateSchema(
    @Param('id') id: string,
    @Body() { version, schema }: UpdateSchemaDto,
  ) {
    try {
      await this.schemaService.updateSchema(id, {
        schema,
        version,
      });
      return HttpStatus.OK;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private schemaResponse = (doc: SchemaDocument) => {
    const data = doc.toJSON();
    return {
      ...data,
      version: this.schemaService.getVersion(data.version),
    };
  };
}
