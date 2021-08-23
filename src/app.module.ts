import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatorModule } from './validator/validator.module';
import { SchemaModule } from './schema/schema.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ValidatorModule,
    SchemaModule,
    MongooseModule.forRoot('mongodb://localhost/mentimeter-modules'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
