import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminMediaPage() {
  return (
    <AdminResourcePage
      title="Médiathèque"
      description="Enregistrez et réutilisez les URLs des images Cloudinary."
      endpoint="/admin/media"
      listLabel="Bibliothèque"
      createLabel="Ajouter un média"
      fields={[
        { name: "url", label: "URL", required: true },
        { name: "publicId", label: "Cloudinary public ID", required: true },
        { name: "folder", label: "Dossier" },
        { name: "fileName", label: "Nom du fichier" },
        { name: "mimeType", label: "Type MIME" },
        { name: "size", label: "Taille", type: "number" },
      ]}
    />
  );
}
