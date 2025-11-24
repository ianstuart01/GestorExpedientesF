"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Navbar from "./Navbar";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" ||
    pathname === "/Registro" ||
    pathname === "/Expediente/Crear" ||
    pathname.startsWith("/Expediente/Detalle") ||
    pathname.startsWith("/Expediente/Eliminar") ||
    pathname.startsWith("/Expediente/Editar") ||
    pathname.startsWith("/Movimiento/Registrar");

  return (
    <>
      <Header />
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

