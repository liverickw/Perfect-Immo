import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminBlogPage() {
  return (
    <AdminResourcePage
      title="Blog"
      description="Gérez les articles, les brouillons, la publication et le référencement."
      endpoint="/blogs"
      listLabel="Articles"
      createLabel="Écrire un article"
      fields={[
        { name: "title", label: "Titre", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "category", label: "Catégorie" },
        { name: "tags", label: "Étiquettes", type: "array" },
        { name: "excerpt", label: "Extrait", type: "textarea" },
        { name: "content", label: "Contenu", type: "textarea", required: true },
        { name: "imageUrl", label: "URL de l’image principale" },
        { name: "status", label: "Statut", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "published", label: "Publié", type: "checkbox" },
        { name: "featured", label: "Mis en avant", type: "checkbox" },
        { name: "publishedAt", label: "Date de publication", type: "date" },
        { name: "scheduledAt", label: "Date de programmation", type: "date" },
        { name: "metaTitle", label: "Méta-titre" },
        { name: "metaDescription", label: "Méta-description", type: "textarea" },
      ]}
    />
  );
}
