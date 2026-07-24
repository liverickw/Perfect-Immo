import { realisationRepository } from "../repositories/realisation.repository";
import { AppError } from "../utils/app-error";
import type {
  RealisationInput,
  UpdateRealisationInput,
} from "../validators/realisation.validator";

export const realisationService = {
  getAll() {
    return realisationRepository.findAll();
  },

  async getById(id: string) {
    const realisation = await realisationRepository.findById(id);
    if (!realisation) throw new AppError("Realisation not found", 404);
    return realisation;
  },

  create(data: RealisationInput) {
    return realisationRepository.create({
      ...data,
      gallery: data.gallery ?? [],
      servicesUsed: data.servicesUsed ?? [],
    });
  },

  async update(id: string, data: UpdateRealisationInput) {
    await this.getById(id);
    return realisationRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);
    return realisationRepository.softDelete(id);
  },
};
