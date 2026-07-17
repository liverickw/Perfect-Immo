import { projectRepository } from "../repositories/project.repository";
import { AppError } from "../utils/app-error";
import type {
  ProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator";

export const projectService = {
  getAll() {
    return projectRepository.findAll();
  },

  async getById(id: string) {
    const project = await projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return project;
  },

  create(data: ProjectInput) {
    return projectRepository.create(data);
  },

  async update(id: string, data: UpdateProjectInput) {
    await this.getById(id);
    return projectRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);
    return projectRepository.delete(id);
  },
};
