import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminRealisationsPage() {
  return (
    <AdminResourcePage
      title="Realisations"
      description="Manage delivered client work independently from projects."
      endpoint="/realisations"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "client", label: "Client" },
        { name: "location", label: "Location" },
        { name: "completionDate", label: "Completion date" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "imageUrl", label: "Image URL" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
