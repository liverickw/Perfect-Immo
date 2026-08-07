import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminRealisationsPage() {
  return (
    <AdminResourcePage
      title="Réalisations"
      description="Gérez les travaux livrés aux clients indépendamment des projets."
      endpoint="/realisations"
      listLabel="Liste des réalisations"
      createLabel="Ajouter une réalisation"
      fields={[
        { name: "title", label: "Titre", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "client", label: "Client" },
        { name: "location", label: "Localisation" },
        { name: "completionDate", label: "Date d’achèvement", type: "date" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "imageUrl", label: "URL de l’image" },
        { name: "gallery", label: "URLs de la galerie", type: "array" },
        { name: "servicesUsed", label: "Services utilisés", type: "array" },
        { name: "published", label: "Publié", type: "checkbox" },
        { name: "featured", label: "Mis en avant", type: "checkbox" },
        { name: "metaTitle", label: "Méta-titre" },
        { name: "metaDescription", label: "Méta-description", type: "textarea" },
      ]}
    />
  );
}
