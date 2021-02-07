/* eslint-disable func-names */
import { Schema, model, models } from 'mongoose';

import { statuses } from 'utils/status';
import { stories, cities, toJSONDate } from '../collections';

const MediaSchema = new Schema({
  src: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video'],
    default: 'image'
  },
  path: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  position: Number
});

MediaSchema.virtual('id').get(function () {
  return this._id.toString();
});
MediaSchema.set('toJSON', {
  virtuals: true,
  getters: true,
  transform: (_, { _id, ...ret }) => ret
});

const StorySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    author: String,
    description: String,
    location: String,
    city: {
      type: Schema.Types.ObjectId,
      ref: cities.model
    },
    eventDate: {
      type: Date,
      default: undefined,
      required: true
    },
    status: {
      type: Number,
      default: statuses.UNVERIFIED
    },
    media: [MediaSchema]
  },
  { timestamps: true }
);

StorySchema.index(
  {
    title: 'text',
    slug: 1,
    eventDate: 1
  },
  { unique: true }
);

StorySchema.virtual('id').get(function () {
  return this._id.toString();
});

StorySchema.set('toJSON', {
  virtuals: true,
  getters: true,
  transform: (_, { _id, ...story }) => {
    toJSONDate(story, ['eventDate', 'createdAt', 'updatedAt']);
    return story;
  }
});

StorySchema.static(
  'getMonths',
  function (options = { status: statuses.APPROVED }) {
    return this.aggregate()
      .match(options)
      .group({
        _id: { $dateToString: { format: '%Y-%m', date: '$eventDate' } }
      })
      .project({ _id: 0, date: '$_id' })
      .sort({ date: -1 });
  }
);

StorySchema.static(
  'getTimeline',
  function (options = { status: statuses.APPROVED }) {
    return this.aggregate()
      .match(options)
      .lookup({
        from: cities.collection,
        as: 'city',
        let: { cityId: '$city' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$cityId'] } } },
          { $project: { slug: 1, name: 1, id: { $toString: '$_id' }, _id: 0 } }
        ]
      })
      .unwind('$city')
      .group({
        _id: '$eventDate',
        cities: {
          $addToSet: '$city'
        },
        count: { $sum: 1 }
      })
      .group({
        _id: { $dateToString: { format: '%Y-%m', date: '$_id' } },
        timeline: {
          $addToSet: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$_id' } },
            cities: '$cities',
            count: '$count'
          }
        },
        count: { $sum: '$count' }
      })
      .project({ _id: 0, date: '$_id', timeline: 1, count: 1 })
      .sort({ date: -1 });
  }
);

const Story =
  models.Story || model(stories.model, StorySchema, stories.collection);

export default Story;
