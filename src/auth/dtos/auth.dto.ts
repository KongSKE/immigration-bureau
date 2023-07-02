import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { Gender, Religion } from 'src/libs/database/enums/user.enum';

export class UserLoginDTO {
  @ApiProperty({
    description: 'username',
    example: 'jonathan',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'babayaga@4',
    required: true,
  })
  password: string;
}

export const userLoginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export class UserRegisterDTO {
  @ApiProperty({
    description: 'username',
    example: 'jonathan',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'babayaga@4',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'first name',
    example: 'john',
    required: true,
  })
  first_name: string;

  @ApiProperty({
    description: 'last name',
    example: 'wick',
    required: true,
  })
  last_name: string;

  @ApiProperty({
    description: 'email',
    example: 'john_wick@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'mobile number',
    example: '06XXXXXXXX',
    required: true,
  })
  mobile_number: string;

  @ApiProperty({
    description: 'identification number',
    example: '0123456789123',
    required: true,
  })
  identification_number: string;

  @ApiProperty({
    description: 'gender',
    example: 'male',
    enum: Gender,
    required: true,
  })
  gender: Gender;

  @ApiProperty({
    description: 'religion',
    example: 'Buddhism',
    enum: Religion,
    required: true,
  })
  religion: Religion;

  @ApiProperty({
    description: 'ethnicity',
    example: 'Thai',
    required: true,
  })
  ethnicity: string;

  @ApiProperty({
    description: 'nationality',
    example: 'Thai',
    required: true,
  })
  nationality: string;

  @ApiProperty({
    description: 'country Id',
    required: true,
  })
  country_id: string;

  @ApiProperty({
    description: 'address',
    example: 'Bangkok, Siam Paragon',
    required: true,
  })
  address: string;

  @ApiProperty({
    description: 'date of birth',
    example: '2028-07-01T17:00:00.000Z',
    required: true,
  })
  date_of_birth: Date;

  @ApiProperty({
    description: 'date of issue',
    example: '2028-07-01T17:00:00.000Z',
    required: true,
  })
  date_of_issue: Date;

  @ApiProperty({
    description: 'date of expiry',
    example: '2028-07-01T17:00:00.000Z',
    required: true,
  })
  date_of_expiry: Date;
}

export const userRegisterValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required().allow(''),
  mobile_number: Joi.string().required(),
  identification_number: Joi.string().required(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required(),
  religion: Joi.string()
    .valid(...Object.values(Religion))
    .required(),
  ethnicity: Joi.string().required(),
  nationality: Joi.string().required(),
  country_id: Joi.string().required(),
  address: Joi.string().required(),
  date_of_birth: Joi.date().iso().required(),
  date_of_issue: Joi.date().iso().required(),
  date_of_expiry: Joi.date().iso().required(),
});
