import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    if (typeof window !== "undefined") router.push("/login");
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Hola {session.user.name}</h1>
      <p>Rol: {session.user.role}</p>
    </div>
  );
}
