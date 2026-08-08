import { serviceRepository } from "../repositories/service.repository";
import { AppError } from "../utils/app-error";
import type { ServiceInput, UpdateServiceInput } from "../validators/service.validator";

export const serviceService = {
  getAll(options?: { includeDrafts?: boolean }) {
    return serviceRepository.findAll(options);
  },

  async getById(id: string, options?: { includeDrafts?: boolean }) {
    const service = await serviceRepository.findById(id, options);
    if (!service) throw new AppError("Service not found", 404);
    return service;
  },

  create(data: ServiceInput) {
    return serviceRepository.create({ ...data, gallery: data.gallery ?? [] });
  },

  async update(id: string, data: UpdateServiceInput) {
    await this.getById(id, { includeDrafts: true });
    return serviceRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id, { includeDrafts: true });
    return serviceRepository.softDelete(id);
  },
};
