import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminPropertiesPage() {
  return (
    <AdminResourcePage
      title="Properties"
      description="Manage real estate catalogue items, statuses and SEO data."
      endpoint="/properties"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "location", label: "Location", required: true },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "bedrooms", label: "Bedrooms", type: "number" },
        { name: "bathrooms", label: "Bathrooms", type: "number" },
        { name: "area", label: "Area", type: "number" },
        { name: "status", label: "Status" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "imageUrl", label: "Image URL" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
