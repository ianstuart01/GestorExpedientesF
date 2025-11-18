"use client";
import Image from "next/image";

export default function Header() {

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <header className="w-full bg-sky-200 shadow-md flex items-center justify-between h-[100px]">
      <div className="flex items-center h-full">
        
        {/* Logo UTN primero */}
        <div className="relative h-[55%] aspect-[3/2] flex items-center justify-center bg-sky-200 px-2 mr-2">
          <Image
            src="/utnlogo.png"
            alt="Logo UTN La Plata"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Logo LINSI */}
        <div className="relative h-[60%] aspect-[4/3] flex items-center justify-center bg-sky-200 px-2">
          <Image
            src="/linsilogo.png"
            alt="Logo LINSI"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <h1 className="text-center text-blue-900 font-bold text-xl leading-tight">
        Gestor de Expedientes
        <span className="block text-gray-700 text-sm font-medium">
          Laboratorio de Innovaciones en Sistemas de Información
        </span>
      </h1>

      <button
        onClick={handleLogout}
        className="text-black font-semibold text-sm mr-6 px-5 py-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:shadow-md active:translate-y-[1px]"
      >
        Cerrar sesión
      </button>
    </header>
  );
}