import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminPropertiesPage() {
  return (
    <AdminResourcePage
      title="Biens immobiliers"
      description="Gérez les biens du catalogue, leurs statuts et leurs données SEO."
      endpoint="/properties"
      listLabel="Liste des biens"
      createLabel="Ajouter un bien"
      fields={[
        { name: "title", label: "Titre", required: true },
        { name: "slug", label: "Slug" },
        { name: "location", label: "Localisation", required: true },
        { name: "price", label: "Prix", type: "number", required: true },
        { name: "bedrooms", label: "Chambres", type: "number" },
        { name: "bathrooms", label: "Salles de bain", type: "number" },
        { name: "area", label: "Surface", type: "number" },
        { name: "status", label: "Statut", type: "select", options: ["AVAILABLE", "RESERVED", "SOLD", "RENTED"] },
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
