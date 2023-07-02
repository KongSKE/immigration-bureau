import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorResponseMessage } from 'src/libs/constants/api';
import { Country } from 'src/libs/database/schemas/country.schema';
import { BaseLogicException } from 'src/libs/exceptions/BaseLogicException';
import { APIResponse } from 'src/libs/utils/api-response';
import { CountryService } from '../services/country.service';

@ApiTags('country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAllCountries(): Promise<APIResponse<{ countries: Country[] }>> {
    const countries = await this.countryService.findAllCountries();
    return { success: true, countries };
  }

  @Get(':id')
  async getCountryById(
    @Param('id') id: string,
  ): Promise<APIResponse<{ country: Country }>> {
    const country = await this.countryService.findCountryById(id);
    if (!country) {
      throw new BaseLogicException({
        error_code: HttpStatus.NOT_FOUND,
        error_message: ErrorResponseMessage.USER_WAS_NOT_FOUND,
      });
    }
    return { success: true, country };
  }
}
