import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Country } from 'src/libs/database/schemas/country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: ReturnModelType<typeof Country>,
  ) {}

  async findAllCountries() {
    return this.countryModel.find();
  }

  async findCountryById(id: string) {
    return this.countryModel.findById(id);
  }
}
