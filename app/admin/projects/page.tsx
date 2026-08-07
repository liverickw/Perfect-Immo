import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminProjectsPage() {
  return (
    <AdminResourcePage
      title="Projets"
      description="Créez, publiez, mettez en avant et archivez les projets du site."
      endpoint="/projects"
      listLabel="Liste des projets"
      createLabel="Ajouter un projet"
      fields={[
        { name: "title", label: "Titre", required: true },
        { name: "slug", label: "Slug" },
        { name: "category", label: "Catégorie" },
        { name: "status", label: "Statut", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "longDescription", label: "Description détaillée", type: "textarea" },
        { name: "imageUrl", label: "URL de l’image" },
        { name: "gallery", label: "URLs de la galerie", type: "array" },
        { name: "published", label: "Publié", type: "checkbox" },
        { name: "featured", label: "Mis en avant", type: "checkbox" },
        { name: "metaTitle", label: "Méta-titre" },
        { name: "metaDescription", label: "Méta-description", type: "textarea" },
      ]}
    />
  );
}
