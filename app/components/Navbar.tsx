"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { label: "Inicio", path: "/Inicio" },
    { label: "Usuarios", path: "/Usuario" },
    { label: "Expedientes", path: "/Expediente" },
    { label: "Historial Movimientos", path: "/Movimiento/Lista" },
  ];

  return (
    <nav
      className="w-full flex justify-center items-center py-3 font-semibold gap-4"
      style={{ backgroundColor: "#21BCEE" }}
    >
      {links.map((item, index) => (
        <React.Fragment key={item.path}>
          <button
            onClick={() => router.push(item.path)}
            className={`px-15 transition-all duration-200 text-blue-900 hover:text-white hover:scale-[1.05] 
              ${pathname === item.path ? "text-white scale-[1.07]" : ""}`}
          >
            {item.label}
          </button>

          {/* Divisor excepto el último */}
          {index < links.length - 1 && (
            <div
              className="border-l h-6 mx-6"
              style={{ borderColor: "#116BF8" }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
