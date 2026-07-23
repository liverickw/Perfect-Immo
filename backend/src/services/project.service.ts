import { projectRepository } from "../repositories/project.repository";
import { AppError } from "../utils/app-error";
import { cache } from "../utils/cache";
import type {
  ProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator";

const LIST_KEY = "projects:all";
const itemKey = (id: string) => `projects:${id}`;

export const projectService = {
  getAll() {
    return cache.wrap(LIST_KEY, 300, () => projectRepository.findAll());
  },

  async getById(id: string) {
    const project = await cache.wrap(itemKey(id), 300, () =>
      projectRepository.findById(id)
    );

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return project;
  },

  async create(data: ProjectInput) {
    const project = await projectRepository.create(data);
    await cache.del(LIST_KEY);
    return project;
  },

  async update(id: string, data: UpdateProjectInput) {
    await this.getById(id);
    const project = await projectRepository.update(id, data);
    await cache.del(LIST_KEY, itemKey(id));
    return project;
  },

  async delete(id: string) {
    await this.getById(id);
    const project = await projectRepository.delete(id);
    await cache.del(LIST_KEY, itemKey(id));
    return project;
  },
};
