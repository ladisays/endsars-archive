/* eslint-disable func-names */
import { Schema, model, models } from 'mongoose';

import { cities, countries, toJSONDate } from '../collections';

const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    country: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: countries.model
    }
  },
  { timestamps: true }
);

CitySchema.index(
  {
    name: 'text',
    slug: 1
  },
  { unique: true }
);

CitySchema.virtual('id').get(function () {
  return this._id.toString();
});
CitySchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (_, { _id, ...city }) => {
    toJSONDate(city, ['createdAt', 'updatedAt']);
    return city;
  }
});

const City = models.City || model(cities.model, CitySchema, cities.collection);

export default City;
