import { propertyRepository } from "../repositories/property.repository";
import { AppError } from "../utils/app-error";
import { cache } from "../utils/cache";
import type {
  PropertyInput,
  UpdatePropertyInput,
} from "../validators/property.validator";

const LIST_KEY = "properties:all";
const itemKey = (id: string) => `properties:${id}`;

export const propertyService = {
  getAll() {
    return cache.wrap(LIST_KEY, 300, () => propertyRepository.findAll());
  },

  async getById(id: string) {
    const property = await cache.wrap(itemKey(id), 300, () =>
      propertyRepository.findById(id)
    );

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    return property;
  },

  async create(data: PropertyInput) {
    const property = await propertyRepository.create(data);
    await cache.del(LIST_KEY);
    return property;
  },

  async update(id: string, data: UpdatePropertyInput) {
    await this.getById(id);
    const property = await propertyRepository.update(id, data);
    await cache.del(LIST_KEY, itemKey(id));
    return property;
  },

  async delete(id: string) {
    await this.getById(id);
    const property = await propertyRepository.delete(id);
    await cache.del(LIST_KEY, itemKey(id));
    return property;
  },
};
