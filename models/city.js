import { generateId, cleanSlug } from 'utils/slugs';

const prefix = 'city';

function City(opts) {
  const now = Date.now();
  this.id = opts.id || generateId(prefix);
  this.name = opts.name;
  this.slug = opts.slug || cleanSlug(opts.name);
  this.createdAt = opts.createdAt || now;
  this.updatedAt = opts.updatedAt || now;
}

function toJSON() {
  return {
    id: this.id,
    name: this.name,
    slug: this.slug,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

City.prototype.toJSON = toJSON;

export default City;
