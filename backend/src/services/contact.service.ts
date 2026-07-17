import { contactRepository } from "../repositories/contact.repository";
import type { ContactInput } from "../validators/contact.validator";

export const contactService = {
  getAll() {
    return contactRepository.findAll();
  },

  create(data: ContactInput) {
    return contactRepository.create(data);
  },
};
