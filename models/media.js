import { generateId } from 'utils/slugs';

function Media(opts, prefix = 'media') {
  const now = Date.now();
  this.id = opts.id || generateId(prefix);
  this.storyId = opts.storyId || '';
  this.src = opts.src || '';
  this.path = opts.path || '';
  this.type = opts.type || '';
  this.mimetype = opts.mimetype || '';
  this.position = opts.position || 0;
  this.createdAt = opts.createdAt || now;
  this.updatedAt = opts.updatedAt || now;
}

function toJSON() {
  return {
    id: this.id,
    storyId: this.storyId,
    src: this.src,
    path: this.path,
    type: this.type,
    mimetype: this.mimetype,
    position: this.position,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

Media.prototype.toJSON = toJSON;

export default Media;
