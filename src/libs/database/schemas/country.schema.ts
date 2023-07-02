import {
  buildSchema,
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
})
export class Country {
  // _id: string;

  @prop({
    required: true,
    type: String,
  })
  name: string;
}
export const CountrySchema = buildSchema(Country);
export const CountryModel = getModelForClass(Country);
export type CountryDocument = DocumentType<Country>;
