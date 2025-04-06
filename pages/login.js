import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok) router.push("/dashboard");
    else alert("Credenciales incorrectas");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
