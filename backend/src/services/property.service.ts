import { propertyRepository } from "../repositories/property.repository";
import { AppError } from "../utils/app-error";
import type {
  PropertyInput,
  UpdatePropertyInput,
} from "../validators/property.validator";

export const propertyService = {
  getAll() {
    return propertyRepository.findAll();
  },

  async getById(id: string) {
    const property = await propertyRepository.findById(id);

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    return property;
  },

  create(data: PropertyInput) {
    return propertyRepository.create(data);
  },

  async update(id: string, data: UpdatePropertyInput) {
    await this.getById(id);
    return propertyRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);
    return propertyRepository.delete(id);
  },
};
