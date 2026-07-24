import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminMediaPage() {
  return (
    <AdminResourcePage
      title="Media Library"
      description="Store and reuse Cloudinary image URLs."
      endpoint="/admin/media"
      fields={[
        { name: "url", label: "URL", required: true },
        { name: "publicId", label: "Cloudinary public ID", required: true },
        { name: "folder", label: "Folder" },
        { name: "fileName", label: "File name" },
        { name: "mimeType", label: "Mime type" },
      ]}
    />
  );
}
