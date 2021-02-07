/* eslint-disable func-names */
import { Schema, model, models } from 'mongoose';

import { tokens, toJSONDate } from '../collections';

const TokenSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

TokenSchema.virtual('id').get(function () {
  return this._id.toString();
});
TokenSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (_, { _id, ...token }) => {
    toJSONDate(token, ['createdAt']);
    return token;
  }
});

const Token =
  models.Token || model(tokens.model, TokenSchema, tokens.collection);

export default Token;
