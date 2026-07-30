import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminMessagesPage() {
  return (
    <AdminResourcePage
      title="Messages"
      description="Review contact requests, search, archive and export from the API."
      endpoint="/contacts"
      listLabel="Tous les contacts"
      createLabel="Ajouter un contact"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "phone", label: "Phone" },
        { name: "subject", label: "Subject" },
        { name: "message", label: "Message", type: "textarea", required: true },
      ]}
    />
  );
}
