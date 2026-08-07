import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminMessagesPage() {
  return (
    <AdminResourcePage
      title="Messages"
      description="Consultez, recherchez, archivez et exportez les demandes de contact."
      endpoint="/contacts"
      listLabel="Tous les contacts"
      createLabel="Ajouter un contact"
      fields={[
        { name: "name", label: "Nom", required: true },
        { name: "email", label: "Email", required: true },
        { name: "phone", label: "Téléphone" },
        { name: "subject", label: "Objet" },
        { name: "message", label: "Message", type: "textarea", required: true },
      ]}
    />
  );
}
