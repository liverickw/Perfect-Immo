import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminBlogPage() {
  return (
    <AdminResourcePage
      title="Blog"
      description="Manage articles, drafts, publishing and SEO."
      endpoint="/blogs"
      listLabel="Articles"
      createLabel="Écrire un article"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "category", label: "Category" },
        { name: "tags", label: "Tags", type: "array" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "imageUrl", label: "Featured image URL" },
        { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "publishedAt", label: "Published at", type: "date" },
        { name: "scheduledAt", label: "Scheduled at", type: "date" },
        { name: "metaTitle", label: "Meta title" },
        { name: "metaDescription", label: "Meta description", type: "textarea" },
      ]}
    />
  );
}
