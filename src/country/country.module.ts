import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/libs/database/database.module';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';

@Module({
  imports: [DatabaseModule],
  exports: [CountryService],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
