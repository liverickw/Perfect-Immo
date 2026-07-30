import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminPropertiesPage() {
  return (
    <AdminResourcePage
      title="Properties"
      description="Manage real estate catalogue items, statuses and SEO data."
      endpoint="/properties"
      listLabel="Liste des biens"
      createLabel="Ajouter un bien"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "location", label: "Location", required: true },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "bedrooms", label: "Bedrooms", type: "number" },
        { name: "bathrooms", label: "Bathrooms", type: "number" },
        { name: "area", label: "Area", type: "number" },
        { name: "status", label: "Status", type: "select", options: ["AVAILABLE", "RESERVED", "SOLD", "RENTED"] },
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
