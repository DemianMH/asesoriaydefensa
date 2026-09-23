import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata = { title: "Acceso administrador" };

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();
  if (authenticated) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <LoginForm />
    </div>
  );
}
