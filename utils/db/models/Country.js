/* eslint-disable func-names */
import { Schema, model, models } from 'mongoose';

import { countries, toJSONDate } from '../collections';

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

CountrySchema.index(
  {
    name: 'text',
    slug: 1
  },
  { unique: true }
);

CountrySchema.virtual('id').get(function () {
  return this._id.toString();
});
CountrySchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (_, { _id, ...country }) => {
    toJSONDate(country, ['createdAt', 'updatedAt']);
    return country;
  }
});

const Country =
  models.Country || model(countries.model, CountrySchema, countries.collection);

export default Country;
