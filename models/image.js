import { generateId } from 'utils/slugs';

const prefix = 'image';

function Image(opts) {
  const now = Date.now();
  this.id = opts.id || generateId(prefix);
  this.storyId = opts.storyId;
  this.src = opts.src;
  this.path = opts.path;
  this.mimetype = opts.mimetype;
  this.createdAt = opts.createdAt || now;
  this.updatedAt = opts.updatedAt || now;
}

function toJSON() {
  return {
    id: this.id,
    storyId: this.storyId,
    src: this.src,
    path: this.path,
    mimetype: this.mimetype,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

Image.prototype.toJSON = toJSON;

export default Image;
