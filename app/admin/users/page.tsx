import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminUsersPage() {
  return (
    <AdminResourcePage
      title="Utilisateurs"
      description="Gérez les administrateurs, leurs rôles et l’état de leur compte."
      endpoint="/auth/users"
      listLabel="Équipe"
      createLabel="Inviter un utilisateur"
      fields={[
        { name: "name", label: "Nom", required: true },
        { name: "email", label: "Email", required: true },
        { name: "password", label: "Mot de passe", required: true },
        { name: "role", label: "Rôle", type: "select", options: ["EDITOR", "ADMIN", "SUPER_ADMIN"] },
        { name: "active", label: "Actif", type: "checkbox" },
      ]}
    />
  );
}
