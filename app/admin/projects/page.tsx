import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminProjectsPage() {
  return (
    <AdminResourcePage
      title="Projects"
      description="Create, publish, feature and archive website projects."
      endpoint="/projects"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "category", label: "Category" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "imageUrl", label: "Image URL" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "metaTitle", label: "Meta title" },
        { name: "metaDescription", label: "Meta description", type: "textarea" },
      ]}
    />
  );
}
