import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminServicesPage() {
  return (
    <AdminResourcePage
      title="Services"
      description="Manage professional services displayed on the public website."
      endpoint="/services"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "category", label: "Category" },
        { name: "icon", label: "Icon" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "longDescription", label: "Long description", type: "textarea" },
        { name: "imageUrl", label: "Image URL" },
        { name: "displayOrder", label: "Display order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "metaTitle", label: "Meta title" },
        { name: "metaDescription", label: "Meta description", type: "textarea" },
      ]}
    />
  );
}
