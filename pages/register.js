import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState('user');  // Aquí mantienes el estado para el role
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formWithRole = { ...form, role };  // Agregar 'role' al objeto 'form'

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formWithRole),  // Enviar el objeto 'formWithRole' que ahora incluye 'role'
    });

    if (res.ok) router.push("/login");
    else alert("Error al registrarse");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}  // Aquí el valor se actualizará al seleccionar un rol
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Registrarse</button>
    </form>
  );
}
