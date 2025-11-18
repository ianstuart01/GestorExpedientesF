"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Navbar from "./Navbar";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pantallas sin navbar
  const noNavbarRoutes = ["/login", "/Registro", "/Expediente/Crear", "/Expediente/Detalle", "/Expediente/Eliminar", "/Expediente/Editar", 
    "/Movimiento/Lista/[id]", "/Movimiento/Eliminar"
  ]; // ← agregá todas las rutas que quieras sin navbar

  const hideNavbar = noNavbarRoutes.includes(pathname);

  return (
    <>
      {/* Header SIEMPRE visible */}
      <Header />

      {/* Navbar solo si NO está en una ruta oculta */}
      {!hideNavbar && <Navbar />}

      {children}
    </>
  );
}
