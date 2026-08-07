import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminServicesPage() {
  return (
    <AdminResourcePage
      title="Services"
      description="Gérez les services professionnels affichés sur le site public."
      endpoint="/services"
      listLabel="Liste des services"
      createLabel="Ajouter un service"
      fields={[
        { name: "title", label: "Titre", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "category", label: "Catégorie" },
        { name: "icon", label: "Icône" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "longDescription", label: "Description détaillée", type: "textarea" },
        { name: "imageUrl", label: "URL de l’image" },
        { name: "gallery", label: "URLs de la galerie", type: "array" },
        { name: "displayOrder", label: "Ordre d’affichage", type: "number" },
        { name: "published", label: "Publié", type: "checkbox" },
        { name: "metaTitle", label: "Méta-titre" },
        { name: "metaDescription", label: "Méta-description", type: "textarea" },
      ]}
    />
  );
}
