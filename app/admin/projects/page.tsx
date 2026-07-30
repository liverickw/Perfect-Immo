import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminProjectsPage() {
  return (
    <AdminResourcePage
      title="Projects"
      description="Create, publish, feature and archive website projects."
      endpoint="/projects"
      listLabel="Liste des projets"
      createLabel="Ajouter un projet"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "category", label: "Category" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "longDescription", label: "Long description", type: "textarea" },
        { name: "imageUrl", label: "Image URL" },
        { name: "gallery", label: "Gallery URLs", type: "array" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "metaTitle", label: "Meta title" },
        { name: "metaDescription", label: "Meta description", type: "textarea" },
      ]}
    />
  );
}
