import { blogRepository } from "../repositories/blog.repository";
import { AppError } from "../utils/app-error";
import type { BlogInput, UpdateBlogInput } from "../validators/blog.validator";

export const blogService = {
  getAll() {
    return blogRepository.findAll();
  },

  async getById(id: string) {
    const blog = await blogRepository.findById(id);

    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    return blog;
  },

  async getBySlug(slug: string) {
    const blog = await blogRepository.findBySlug(slug);

    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    return blog;
  },

  create(data: BlogInput) {
    return blogRepository.create(data);
  },

  async update(id: string, data: UpdateBlogInput) {
    await this.getById(id);
    return blogRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);
    return blogRepository.delete(id);
  },
};
