import {
  buildSchema,
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { Gender, Religion } from '../enums/user.enum';
import { Country } from './country.schema';

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
})
@index({ username: 1 }, { unique: true })
export class User {
  @prop({
    required: true,
    type: String,
  })
  username: string;

  @prop({
    required: true,
    type: String,
    select: false,
  })
  password: string;

  @prop({
    required: true,
    type: String,
  })
  first_name: string;

  @prop({
    required: true,
    type: String,
  })
  last_name: string;

  @prop({
    type: String,
    required: false,
  })
  email?: string;

  @prop({
    type: String,
    required: true,
  })
  mobile_number: string;

  @prop({
    required: true,
    type: String,
  })
  identification_number: string;

  @prop({
    required: true,
    type: String,
    enum: Object.values(Gender),
  })
  gender: Gender;

  @prop({
    required: true,
    type: String,
    enum: Object.values(Religion),
  })
  religion: Religion;

  @prop({
    required: true,
    type: String,
  })
  ethnicity: string;

  @prop({
    required: true,
    type: String,
  })
  nationality: string;

  @prop({
    required: true,
    ref: Country.name,
  })
  country_id: Ref<Country, string>;

  @prop({
    required: true,
    type: String,
  })
  address: string;

  @prop({
    required: true,
    type: Date,
  })
  date_of_birth: Date;

  @prop({
    required: true,
    type: Date,
  })
  date_of_issue: Date;

  @prop({
    required: true,
    type: Date,
  })
  date_of_expiry: Date;
}

export const UserSchema = buildSchema(User);
export type UserDocument = DocumentType<User>;
