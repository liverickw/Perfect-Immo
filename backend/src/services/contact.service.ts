import { contactRepository } from "../repositories/contact.repository";
import { AppError } from "../utils/app-error";
import type { ContactInput } from "../validators/contact.validator";

export const contactService = {
  getAll() {
    return contactRepository.findAll();
  },

  create(data: ContactInput) {
    return contactRepository.create(data);
  },

  async updateStatus(
    id: string,
    data: { status?: "UNREAD" | "READ" | "ARCHIVED"; replyStatus?: "PENDING" | "REPLIED" },
  ) {
    const contact = await contactRepository.findById(id);
    if (!contact) throw new AppError("Contact not found", 404);

    return contactRepository.update(id, {
      ...data,
      readAt: data.status === "READ" ? new Date() : undefined,
      archivedAt: data.status === "ARCHIVED" ? new Date() : undefined,
    });
  },
};
