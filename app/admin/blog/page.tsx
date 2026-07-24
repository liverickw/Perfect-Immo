import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminBlogPage() {
  return (
    <AdminResourcePage
      title="Blog"
      description="Manage articles, drafts, publishing and SEO."
      endpoint="/blogs"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "category", label: "Category" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "imageUrl", label: "Featured image URL" },
        { name: "published", label: "Published", type: "checkbox" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "scheduledAt", label: "Scheduled at" },
        { name: "metaTitle", label: "Meta title" },
        { name: "metaDescription", label: "Meta description", type: "textarea" },
      ]}
    />
  );
}
