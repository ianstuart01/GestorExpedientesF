"use client";
import React from "react";
import Image from "next/image";

export default function AdminHome() {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen flex flex-col bg-cyan-100">
      <header className="w-full bg-sky-200 shadow-md flex items-center justify-between h-[100px]">
        <div className="flex items-center h-full">
          <div className="h-full w-[100px] flex items-center justify-center bg-sky-200">
            <Image
              src="/linsi-logo.png"
              alt="Logo LINSI"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>
          <div className="h-full w-[100px] flex items-center justify-center bg-sky-200">
            <Image
              src="/utn-logo.png"
              alt="Logo UTN La Plata"
              width={100}
              height={120}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-center text-blue-900 font-bold text-lg leading-tight">
          Gestor de Expedientes
          <span className="block text-gray-700 text-sm font-medium">
            Laboratorio de Innovaciones en Sistemas de Información
          </span>
        </h1>

        <button
          onClick={handleLogout}
          className="text-black font-semibold text-[14px] mr-6 hover:text-gray-700"
        >
          Cerrar Sesión
        </button>
      </header>

      <nav className="w-full bg-sky-400 text-black font-medium flex justify-center items-center py-3 shadow">
        <button className="px-30 hover:text-white transition">Inicio</button>
        <div className="border-l border-black h-6 mx-4"></div>
        <button className="px-30 hover:text-white transition">Usuarios</button>
        <div className="border-l border-black h-6 mx-4"></div>
        <button 
            onClick={() => window.location.href = "/Expediente"}
            className="px-30 hover:text-white transition"
        >
            Expedientes
        </button>
        <div className="border-l border-black h-6 mx-4"></div>
        <button className="px-30 hover:text-white transition">Historial</button>
      </nav>

      <section className="flex flex-1 items-center justify-center bg-cyan-100">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          Ventana de Página de Inicio 
        </h1>
      </section>
    </main>
  );
}
