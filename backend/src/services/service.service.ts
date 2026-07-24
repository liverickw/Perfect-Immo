import { serviceRepository } from "../repositories/service.repository";
import { AppError } from "../utils/app-error";
import type { ServiceInput, UpdateServiceInput } from "../validators/service.validator";

export const serviceService = {
  getAll() {
    return serviceRepository.findAll();
  },

  async getById(id: string) {
    const service = await serviceRepository.findById(id);
    if (!service) throw new AppError("Service not found", 404);
    return service;
  },

  create(data: ServiceInput) {
    return serviceRepository.create({ ...data, gallery: data.gallery ?? [] });
  },

  async update(id: string, data: UpdateServiceInput) {
    await this.getById(id);
    return serviceRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);
    return serviceRepository.softDelete(id);
  },
};
