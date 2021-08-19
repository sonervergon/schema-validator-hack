import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateSchemaDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsObject()
  schema: Record<string, any>;
}

export class GetSchemaDto {
  @IsOptional()
  @IsString()
  version: string;
}

export class UpdateSchemaDto {
  @IsNotEmpty()
  schema: Record<string, any>;

  @ValidateIf((value) => ['patch', 'major', 'minor'].includes(value), {
    message: 'version must be one of `patch, major, minor`',
  })
  version: 'patch' | 'major' | 'minor';
}
