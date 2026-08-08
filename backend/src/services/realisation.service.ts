import { realisationRepository } from "../repositories/realisation.repository";
import { AppError } from "../utils/app-error";
import type {
  RealisationInput,
  UpdateRealisationInput,
} from "../validators/realisation.validator";

export const realisationService = {
  getAll(options?: { includeDrafts?: boolean }) {
    return realisationRepository.findAll(options);
  },

  async getById(id: string, options?: { includeDrafts?: boolean }) {
    const realisation = await realisationRepository.findById(id, options);
    if (!realisation) throw new AppError("Realisation not found", 404);
    return realisation;
  },

  create(data: RealisationInput) {
    return realisationRepository.create(data);
  },

  async update(id: string, data: UpdateRealisationInput) {
    await this.getById(id, { includeDrafts: true });
    return realisationRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id, { includeDrafts: true });
    return realisationRepository.softDelete(id);
  },
};
