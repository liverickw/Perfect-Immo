import { blogRepository } from "../repositories/blog.repository";
import { AppError } from "../utils/app-error";
import { cache } from "../utils/cache";
import type { BlogInput, UpdateBlogInput } from "../validators/blog.validator";

const LIST_KEY = "blogs:all";
const itemKey = (id: string) => `blogs:${id}`;
const slugKey = (slug: string) => `blogs:slug:${slug}`;

export const blogService = {
  getAll() {
    return cache.wrap(LIST_KEY, 300, () => blogRepository.findAll());
  },

  async getById(id: string) {
    const blog = await cache.wrap(itemKey(id), 300, () =>
      blogRepository.findById(id)
    );

    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    return blog;
  },

  async getBySlug(slug: string) {
    const blog = await cache.wrap(slugKey(slug), 300, () =>
      blogRepository.findBySlug(slug)
    );

    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    return blog;
  },

  async create(data: BlogInput) {
    const blog = await blogRepository.create(data);
    await cache.del(LIST_KEY);
    return blog;
  },

  async update(id: string, data: UpdateBlogInput) {
    const existing = await this.getById(id);
    const blog = await blogRepository.update(id, data);
    await cache.del(LIST_KEY, itemKey(id), slugKey(existing.slug), slugKey(blog.slug));
    return blog;
  },

  async delete(id: string) {
    const existing = await this.getById(id);
    const blog = await blogRepository.delete(id);
    await cache.del(LIST_KEY, itemKey(id), slugKey(existing.slug));
    return blog;
  },
};
