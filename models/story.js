import { generateId } from 'utils/slugs';

const prefix = 'story';

function Story(opts) {
  const now = Date.now();
  this.id = opts.id || generateId(prefix);
  this.text = opts.text;
  this.active = opts.active || true;
  this.disabled = opts.disabled || false;
  this.eventDate = opts.eventDate || now;
  this.createdAt = opts.createdAt || now;
  this.updatedAt = opts.updatedAt || now;
}

function toJSON() {
  return {
    id: this.id,
    text: this.text,
    active: this.active,
    disabled: this.disabled,
    eventDate: this.eventDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

Story.prototype.toJSON = toJSON;

export default Story;
