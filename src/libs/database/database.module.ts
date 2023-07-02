import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { User, UserSchema } from './schemas/user.schema';

const DB_FEATURES = [
  { name: User.name, schema: UserSchema },
  { name: Country.name, schema: CountrySchema },
];

@Module({
  imports: [MongooseModule.forFeature(DB_FEATURES)],
  exports: [MongooseModule.forFeature(DB_FEATURES)],
})
export class DatabaseModule {}
